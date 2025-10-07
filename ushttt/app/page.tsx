"use client";
import React, { useEffect, useMemo, useState } from "react";
import { NestedBoard } from "./components/NestedBoard";
import { TimerBar } from "./components/TimerBar";
import { createBoard, applyMove, legalMoves, boardWinner } from "./engine/engine";
import type { BoardNode, MovePath, Player } from "./engine/types";

type Mode = "UTTT" | "STTT" | "HTTT";
type Bracket = "light" | "hyperbullet" | "bullet" | "blitz" | "rapid" | "ordinary";

const modes: Mode[] = ["UTTT", "STTT", "HTTT"];
const brackets: Bracket[] = ["light", "hyperbullet", "bullet", "blitz", "rapid", "ordinary"];

function depthOf(mode: Mode): number {
  return mode === "UTTT" ? 2 : mode === "STTT" ? 3 : 4;
}

function presetSeconds(mode: Mode, br: Bracket): number {
  if (mode === "UTTT") {
    switch (br) {
      case "light": return 10;
      case "hyperbullet": return 10; // lower bound of range
      case "bullet": return 60;
      case "blitz": return 180;
      case "rapid": return 600;
      case "ordinary": return 1800;
    }
  }
  if (mode === "STTT") {
    switch (br) {
      case "light": return 100;
      case "hyperbullet": return 100;
      case "bullet": return 600;
      case "blitz": return 1800;
      case "rapid": return 6000;
      case "ordinary": return 18000;
    }
  }
  // HTTT
  switch (br) {
    case "light": return 1000;
    case "hyperbullet": return 1000;
    case "bullet": return 6000;
    case "blitz": return 18000;
    case "rapid": return 60000;
    case "ordinary": return 180000;
  }
}

export default function Page() {
  const [mode, setMode] = useState<Mode>("UTTT");
  const [bracket, setBracket] = useState<Bracket>("light");
  const [depth, setDepth] = useState<number>(2);
  const [root, setRoot] = useState<BoardNode>(() => createBoard(2));
  const [current, setCurrent] = useState<Player>("X");
  const [lastPath, setLastPath] = useState<MovePath | null>(null);
  const [xRemain, setXRemain] = useState<number>(presetSeconds("UTTT", "light"));
  const [oRemain, setORemain] = useState<number>(presetSeconds("UTTT", "light"));
  const [running, setRunning] = useState<boolean>(false);

  const winner = boardWinner(root);
  const draw = root.status === "draw";

  useEffect(() => {
    setDepth(depthOf(mode));
  }, [mode]);

  useEffect(() => {
    const s = presetSeconds(mode, bracket);
    setXRemain(s);
    setORemain(s);
  }, [mode, bracket]);

  useEffect(() => {
    setRoot(createBoard(depth));
    setCurrent("X");
    setLastPath(null);
    setRunning(false);
  }, [depth]);

  // timers
  useEffect(() => {
    if (!running) return;
    if (winner || draw) return;
    const id = setInterval(() => {
      if (current === "X") setXRemain((t) => Math.max(0, t - 0.1));
      else setORemain((t) => Math.max(0, t - 0.1));
    }, 100);
    return () => clearInterval(id);
  }, [running, current, winner, draw]);

  useEffect(() => {
    if (!running) return;
    if (current === "X" && xRemain <= 0) setRunning(false);
    if (current === "O" && oRemain <= 0) setRunning(false);
  }, [xRemain, oRemain, running, current]);

  useEffect(() => {
    if (winner || draw) setRunning(false);
  }, [winner, draw]);

  const legal = useMemo(() => new Set(legalMoves(root, lastPath).map((p) => p.join("."))), [root, lastPath]);
  const forcedPrefix = useMemo(() => {
    if (!lastPath) return null;
    const forced = lastPath.slice(1);
    const forcedStr = forced.join(".");
    const allUnderForced = Array.from(legal).every((k) => k.startsWith(forcedStr + "."));
    return allUnderForced ? forced : null;
  }, [lastPath, legal]);

  const onPlay = (path: MovePath) => {
    if (!running) return;
    const key = path.join(".");
    if (!legal.has(key)) return;
    const next = applyMove(root, path, current);
    setRoot(next);
    setLastPath(path);
    setCurrent(current === "X" ? "O" : "X");
  };

  const startGame = () => {
    setRoot(createBoard(depth));
    const s = presetSeconds(mode, bracket);
    setXRemain(s);
    setORemain(s);
    setCurrent("X");
    setLastPath(null);
    setRunning(true);
  };

  const stopGame = () => setRunning(false);

  return (
    <div className="container">
      <div className="header">
        <select className="select" value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
          {modes.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select className="select" value={bracket} onChange={(e) => setBracket(e.target.value as Bracket)}>
          {brackets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <span className="badge">depth {depth}</span>
        <button className="button" onClick={startGame}>Start</button>
        <button className="button secondary" onClick={stopGame}>Stop</button>
      </div>

      <NestedBoard root={root} onPlay={onPlay} legalSet={legal} forcedPrefix={forcedPrefix} lastPath={lastPath} />

      <div className="statusBar">
        <TimerBar label="X" totalSeconds={presetSeconds(mode, bracket)} remainingSeconds={xRemain} color="var(--x)" />
        <TimerBar label="O" totalSeconds={presetSeconds(mode, bracket)} remainingSeconds={oRemain} color="var(--o)" />
      </div>

      {winner && <div className="winBanner">Winner: {winner}</div>}
      {!winner && draw && <div className="drawBanner">Draw</div>}

      <div className="footer">Local-only MVP. UTTT/STTT/HTTT 규칙 일반화, 강제 보드 표시, 타이머 포함.</div>
    </div>
  );
}
