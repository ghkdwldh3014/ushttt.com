"use client";
import React from "react";

interface TimerBarProps {
  label: string;
  totalSeconds: number;
  remainingSeconds: number;
  color: string;
}

export function TimerBar({ label, totalSeconds, remainingSeconds, color }: TimerBarProps) {
  const pct = Math.max(0, Math.min(100, (remainingSeconds / Math.max(1, totalSeconds)) * 100));
  return (
    <div className="timer" style={{ position: "relative" }}>
      <div className="timerInner" style={{ width: `${pct}%`, background: color }} />
      <div className="timerLabel">{label}: {Math.max(0, Math.floor(remainingSeconds))}s</div>
    </div>
  );
}
