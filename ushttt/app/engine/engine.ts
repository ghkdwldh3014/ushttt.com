import { BoardNode, BoardStatus, LeafCell, MovePath, Player } from "./types";

export function createBoard(depth: number): BoardNode {
  if (depth < 1) throw new Error("depth must be >= 1");
  if (depth === 1) {
    return {
      kind: "board",
      depth,
      status: "active",
      cells: Array.from({ length: 9 }, () => ({ kind: "leaf", value: null } as LeafCell)),
    };
  }
  return {
    kind: "board",
    depth,
    status: "active",
    cells: Array.from({ length: 9 }, () => createBoard(depth - 1)),
  };
}

export function cloneBoard(node: BoardNode): BoardNode {
  return {
    kind: "board",
    depth: node.depth,
    status: node.status,
    cells: node.cells.map((c) =>
      c.kind === "leaf" ? { kind: "leaf", value: c.value } : cloneBoard(c)
    ),
  };
}

const LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function childOccupantMark(child: LeafCell | BoardNode): Player | null {
  if (child.kind === "leaf") return child.value;
  if (child.status === "won_X") return "X";
  if (child.status === "won_O") return "O";
  return null;
}

function evaluateBoardStatus(node: BoardNode): BoardStatus {
  // evaluate using occupant marks of children; for depth 1 leaf board, leaf values
  for (const line of LINES) {
    const a = childOccupantMark(node.cells[line[0]]);
    if (!a) continue;
    const b = childOccupantMark(node.cells[line[1]]);
    const c = childOccupantMark(node.cells[line[2]]);
    if (a && b === a && c === a) return a === "X" ? "won_X" : "won_O";
  }
  const anyActive = node.cells.some((ch) => {
    if (ch.kind === "leaf") return ch.value === null;
    return ch.status === "active";
  });
  if (anyActive) return "active";
  return "draw";
}

function getNodeAtPrefix(root: BoardNode, prefix: number[]): BoardNode | null {
  let cur: BoardNode = root;
  for (let i = 0; i < prefix.length; i++) {
    const idx = prefix[i];
    const child = cur.cells[idx];
    if (!child || child.kind !== "board") return null;
    cur = child;
  }
  return cur;
}

function getLeafAtPath(root: BoardNode, path: MovePath): LeafCell | null {
  let cur: BoardNode = root;
  for (let i = 0; i < path.length - 1; i++) {
    const idx = path[i];
    const child = cur.cells[idx];
    if (!child || child.kind !== "board") return null;
    cur = child;
  }
  const leafIdx = path[path.length - 1];
  const leaf = cur.cells[leafIdx];
  if (!leaf || leaf.kind !== "leaf") return null;
  return leaf;
}

function setLeafAtPath(root: BoardNode, path: MovePath, value: Player): BoardNode {
  // deep clone on the path, update statuses on the way back
  const recurse = (node: BoardNode, depthIndex: number): BoardNode => {
    const idx = path[depthIndex];
    const newCells = node.cells.slice();
    if (depthIndex === path.length - 1) {
      const target = newCells[idx] as LeafCell;
      if (target.kind !== "leaf") throw new Error("expected leaf");
      if (target.value !== null) throw new Error("cell occupied");
      newCells[idx] = { kind: "leaf", value: value } as LeafCell;
    } else {
      const child = newCells[idx];
      if (!child || child.kind !== "board") throw new Error("expected board child");
      newCells[idx] = recurse(child, depthIndex + 1);
    }
    const newNode: BoardNode = { kind: "board", depth: node.depth, cells: newCells, status: "active" };
    newNode.status = evaluateBoardStatus(newNode);
    return newNode;
  };
  return recurse(root, 0);
}

export function isBoardClosed(node: BoardNode): boolean {
  return node.status === "won_X" || node.status === "won_O" || node.status === "draw";
}

function collectEmptyLeafPathsUnder(root: BoardNode, prefix: number[]): MovePath[] {
  const node = getNodeAtPrefix(root, prefix);
  if (!node) return [];
  const results: MovePath[] = [];
  const walk = (n: BoardNode, acc: number[]) => {
    if (n.depth === 1) {
      for (let i = 0; i < 9; i++) {
        const ch = n.cells[i] as LeafCell;
        if (ch.kind !== "leaf") continue;
        if (ch.value === null) results.push([...acc, i]);
      }
      return;
    }
    for (let i = 0; i < 9; i++) {
      const ch = n.cells[i];
      if (!ch || ch.kind !== "board") continue;
      if (isBoardClosed(ch)) continue;
      walk(ch, [...acc, i]);
    }
  };
  walk(node, prefix.slice());
  return results;
}

export function legalMoves(root: BoardNode, lastPath: MovePath | null): MovePath[] {
  const D = root.depth;
  if (!lastPath) {
    // first move: any empty leaf under any active subboard at depth-1
    return collectEmptyLeafPathsUnder(root, []);
  }
  const forcedPrefix = lastPath.slice(1);
  const forcedNode = getNodeAtPrefix(root, forcedPrefix);
  const forcedActive = forcedNode && !isBoardClosed(forcedNode);
  if (forcedActive) {
    // only under forced prefix
    const node = getNodeAtPrefix(root, forcedPrefix)!;
    if (node.depth === 1) {
      // gather all empty leaves directly
      const res: MovePath[] = [];
      for (let i = 0; i < 9; i++) {
        const ch = node.cells[i] as LeafCell;
        if (ch.kind === "leaf" && ch.value === null) res.push([...forcedPrefix, i]);
      }
      return res;
    }
    // for deeper, take any empty leaf under active grandchildren
    return collectEmptyLeafPathsUnder(root, forcedPrefix);
  }
  // forced board closed -> freedom within any active depth-1 boards
  return collectEmptyLeafPathsUnder(root, []);
}

export function applyMove(root: BoardNode, path: MovePath, player: Player): BoardNode {
  const leaf = getLeafAtPath(root, path);
  if (!leaf) throw new Error("invalid path");
  if (leaf.value !== null) throw new Error("occupied");
  return setLeafAtPath(root, path, player);
}

export function boardWinner(node: BoardNode): Player | null {
  if (node.status === "won_X") return "X";
  if (node.status === "won_O") return "O";
  return null;
}
