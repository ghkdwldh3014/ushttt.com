'use client';

import React from 'react';
import { UTTTBoard as UTTTBoardType, Player } from '@/types/game';
import { SmallBoard } from './SmallBoard';

interface UTTTBoardProps {
  board: UTTTBoardType;
  onMove?: (boardIndex: number, cellIndex: number) => void;
  nextValidBoards?: number[] | null;
  currentPlayer?: Player;
  disabled?: boolean;
}

export function UTTTBoard({ 
  board, 
  onMove, 
  nextValidBoards,
  currentPlayer,
  disabled = false 
}: UTTTBoardProps) {
  const handleCellClick = (boardIndex: number, cellIndex: number) => {
    if (disabled || !onMove) return;
    
    // Check if move is valid
    if (nextValidBoards !== null && !nextValidBoards.includes(boardIndex)) {
      return;
    }
    
    if (board.boards[boardIndex].winner !== null) {
      return;
    }
    
    if (board.boards[boardIndex].cells[cellIndex] !== null) {
      return;
    }
    
    onMove(boardIndex, cellIndex);
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-4 bg-gray-800 rounded-lg">
      {board.boards.map((smallBoard, boardIndex) => {
        const isActive = nextValidBoards === null || nextValidBoards.includes(boardIndex);
        const isWon = smallBoard.winner !== null;
        
        return (
          <div
            key={boardIndex}
            className={`
              relative border-2 rounded
              ${isActive && !isWon ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-600'}
              ${!isActive && !disabled ? 'opacity-40' : ''}
              transition-all duration-200
            `}
          >
            <SmallBoard
              cells={smallBoard.cells}
              winner={smallBoard.winner}
              onCellClick={(cellIndex) => handleCellClick(boardIndex, cellIndex)}
              disabled={disabled || !isActive || isWon}
            />
            
            {/* Winner overlay */}
            {isWon && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                <span className={`text-6xl font-bold ${
                  smallBoard.winner === 'X' ? 'text-blue-400' : 'text-red-400'
                }`}>
                  {smallBoard.winner}
                </span>
              </div>
            )}
          </div>
        );
      })}
      
      {/* Main winner overlay */}
      {board.mainWinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg">
          <div className="text-center">
            <div className={`text-9xl font-bold mb-4 ${
              board.mainWinner === 'X' ? 'text-blue-400' : 'text-red-400'
            }`}>
              {board.mainWinner}
            </div>
            <div className="text-3xl text-white">Wins!</div>
          </div>
        </div>
      )}
    </div>
  );
}
