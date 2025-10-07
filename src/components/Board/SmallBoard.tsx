'use client';

import React from 'react';
import { Player } from '@/types/game';

interface SmallBoardProps {
  cells: Player[];
  winner?: Player | null;
  onCellClick?: (cellIndex: number) => void;
  disabled?: boolean;
}

export function SmallBoard({ cells, winner, onCellClick, disabled = false }: SmallBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2 bg-gray-900 rounded">
      {cells.map((cell, index) => (
        <button
          key={index}
          onClick={() => !disabled && onCellClick?.(index)}
          disabled={disabled || cell !== null}
          className={`
            aspect-square flex items-center justify-center
            text-2xl font-bold rounded
            transition-all duration-150
            ${cell === null 
              ? 'bg-gray-700 hover:bg-gray-600 cursor-pointer' 
              : 'bg-gray-800 cursor-not-allowed'
            }
            ${disabled ? 'opacity-50' : ''}
          `}
        >
          {cell === 'X' && <span className="text-blue-400">X</span>}
          {cell === 'O' && <span className="text-red-400">O</span>}
        </button>
      ))}
    </div>
  );
}
