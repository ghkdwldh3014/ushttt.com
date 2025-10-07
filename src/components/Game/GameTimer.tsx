'use client';

import React, { useEffect, useState } from 'react';
import { Player } from '@/types/game';

interface GameTimerProps {
  playerXTime: number; // in seconds
  playerOTime: number; // in seconds
  currentPlayer: Player;
  isActive: boolean;
  onTimeOut?: (player: Player) => void;
}

export function GameTimer({ 
  playerXTime, 
  playerOTime, 
  currentPlayer,
  isActive,
  onTimeOut 
}: GameTimerProps) {
  const [timeX, setTimeX] = useState(playerXTime);
  const [timeO, setTimeO] = useState(playerOTime);

  useEffect(() => {
    if (!isActive || !currentPlayer) return;

    const interval = setInterval(() => {
      if (currentPlayer === 'X') {
        setTimeX(prev => {
          const newTime = Math.max(0, prev - 0.1);
          if (newTime === 0) {
            onTimeOut?.('X');
          }
          return newTime;
        });
      } else if (currentPlayer === 'O') {
        setTimeO(prev => {
          const newTime = Math.max(0, prev - 0.1);
          if (newTime === 0) {
            onTimeOut?.('O');
          }
          return newTime;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, currentPlayer, onTimeOut]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
    }
    return `${secs}.${ms}`;
  };

  const getTimeColor = (time: number, isCurrentPlayer: boolean): string => {
    if (!isCurrentPlayer) return 'text-gray-400';
    if (time < 10) return 'text-red-500 animate-pulse';
    if (time < 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
      <div className={`text-center p-4 rounded ${currentPlayer === 'X' ? 'bg-blue-900/50' : ''}`}>
        <div className="text-sm text-gray-400 mb-1">Player X</div>
        <div className={`text-3xl font-mono font-bold ${getTimeColor(timeX, currentPlayer === 'X')}`}>
          {formatTime(timeX)}
        </div>
      </div>
      
      <div className="text-2xl text-gray-500">VS</div>
      
      <div className={`text-center p-4 rounded ${currentPlayer === 'O' ? 'bg-red-900/50' : ''}`}>
        <div className="text-sm text-gray-400 mb-1">Player O</div>
        <div className={`text-3xl font-mono font-bold ${getTimeColor(timeO, currentPlayer === 'O')}`}>
          {formatTime(timeO)}
        </div>
      </div>
    </div>
  );
}
