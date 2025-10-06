"use client";
import React from "react";
import { BoardNode, MovePath } from "../engine/types";

interface Props {
  root: BoardNode;
  onPlay: (path: MovePath) => void;
  legalSet: Set<string>;
  forcedPrefix: number[] | null;
  lastPath: MovePath | null;
}

export function NestedBoard({ root, onPlay, legalSet, forcedPrefix, lastPath }: Props) {
  const renderNode = (node: BoardNode, pathPrefix: number[]) => {
    if (node.depth === 1) {
      return (
        <div className="subboard">
          {forcedPrefix && startsWith(pathPrefix, forcedPrefix) && <div className="forceHint" />}
          {node.cells.map((cell, idx) => {
            const path = [...pathPrefix, idx];
            const key = path.join(".");
            const isLegal = legalSet.has(key);
            const occupied = cell.kind === "leaf" && cell.value !== null;
            const cls = ["cell", isLegal ? "legal" : "", !isLegal ? "disabled" : ""].join(" ");
            return (
              <div key={idx} className={cls} onClick={() => isLegal && onPlay(path)}>
                {cell.kind === "leaf" && cell.value && (
                  <span className={`mark ${cell.value === "X" ? "x" : "o"}`}>{cell.value}</span>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    // depth > 1
    return (
      <div className="subboard">
        {forcedPrefix && startsWith(pathPrefix, forcedPrefix) && <div className="forceHint" />}
        {node.cells.map((child, idx) => {
          if (child.kind !== "board") return <div key={idx} className="cell disabled" />;
          const childPrefix = [...pathPrefix, idx];
          const childEl = renderNode(child, childPrefix);
          // overlay winner mark for closed boards
          let overlay: React.ReactNode = null;
          if (child.status === "won_X" || child.status === "won_O") {
            const who = child.status === "won_X" ? "X" : "O";
            overlay = <div className="cell" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.15)" }}>
              <span className={`mark ${who === "X" ? "x" : "o"}`} style={{ fontSize: "clamp(22px,4vmin,48px)" }}>{who}</span>
            </div>;
          }
          if (child.status === "draw") {
            overlay = <div className="cell" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.1)", color: "var(--muted)", fontWeight: 700 }}>D</div>;
          }
          return (
            <div key={idx} style={{ position: "relative" }}>
              {childEl}
              {overlay}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="board">
      {root.cells.map((child, idx) => (
        <div key={idx} style={{ position: "relative" }}>
          {child.kind === "board" ? renderNode(child, [idx]) : <div className="cell disabled" />}
        </div>
      ))}
    </div>
  );
}

function startsWith(prefix: number[], target: number[]) {
  if (prefix.length > target.length) return false;
  for (let i = 0; i < prefix.length; i++) if (prefix[i] !== target[i]) return false;
  return true;
}
