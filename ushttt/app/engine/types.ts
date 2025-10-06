export type Player = "X" | "O";
export type CellMark = Player | null;

export type BoardStatus = "active" | "won_X" | "won_O" | "draw";

export interface LeafCell {
  kind: "leaf";
  value: CellMark;
}

export interface BoardNode {
  kind: "board";
  depth: number; // remaining depth to leaf (>=1)
  cells: (LeafCell | BoardNode)[]; // length 9
  status: BoardStatus;
}

export type MovePath = number[]; // length == root.depth

export interface GameState {
  root: BoardNode;
  depth: number;
  current: Player;
  lastPath: MovePath | null;
  winner: Player | null; // convenience (top board winner)
  draw: boolean;
}
