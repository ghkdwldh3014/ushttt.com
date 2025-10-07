'use client';

import React, { useState } from 'react';
import { UTTTBoard } from '@/components/Board/UTTTBoard';
import { GameTimer } from '@/components/Game/GameTimer';
import { GameInfo } from '@/components/Game/GameInfo';
import { createUTTTBoard, makeUTTTMove } from '@/lib/gameLogic';
import { UTTTBoard as UTTTBoardType, Player } from '@/types/game';

export default function Home() {
  const [board, setBoard] = useState<UTTTBoardType>(createUTTTBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [nextValidBoards, setNextValidBoards] = useState<number[] | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [playerXTime, setPlayerXTime] = useState(180); // 3 minutes
  const [playerOTime, setPlayerOTime] = useState(180);
  const [gameActive, setGameActive] = useState(true);

  const handleMove = (boardIndex: number, cellIndex: number) => {
    if (!gameActive || board.mainWinner) return;

    const { board: newBoard, nextValidBoards: newNextBoards } = makeUTTTMove(
      board,
      boardIndex,
      cellIndex,
      currentPlayer
    );

    setBoard(newBoard);
    setNextValidBoards(newNextBoards);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setMoveCount(prev => prev + 1);

    if (newBoard.mainWinner) {
      setGameActive(false);
    }
  };

  const handleTimeOut = (player: Player) => {
    setGameActive(false);
    alert(`${player} ran out of time! ${player === 'X' ? 'O' : 'X'} wins!`);
  };

  const resetGame = () => {
    setBoard(createUTTTBoard());
    setCurrentPlayer('X');
    setNextValidBoards(null);
    setMoveCount(0);
    setPlayerXTime(180);
    setPlayerOTime(180);
    setGameActive(true);
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Ultimate Tic Tac Toe
          </h1>
          <p className="text-gray-400">
            Play the ultimate strategy game online
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <GameInfo
              mode="UTTT"
              timeControl="blitz"
              variant="standard"
              playerX="Oganesson118"
              playerO="Guest"
              moveCount={moveCount}
            />
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">Current Turn</h3>
              <div className={`text-center p-4 rounded ${
                currentPlayer === 'X' ? 'bg-blue-900/50' : 'bg-red-900/50'
              }`}>
                <span className={`text-4xl font-bold ${
                  currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'
                }`}>
                  {currentPlayer}
                </span>
              </div>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
            >
              New Game
            </button>
          </div>

          {/* Game Board */}
          <div className="lg:col-span-2 space-y-4">
            <GameTimer
              playerXTime={playerXTime}
              playerOTime={playerOTime}
              currentPlayer={currentPlayer}
              isActive={gameActive && !board.mainWinner}
              onTimeOut={handleTimeOut}
            />
            
            <UTTTBoard
              board={board}
              onMove={handleMove}
              nextValidBoards={nextValidBoards}
              currentPlayer={currentPlayer}
              disabled={!gameActive || !!board.mainWinner}
            />

            {/* Instructions */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">How to Play</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Win small boards to claim them on the main board</li>
                <li>• Your move determines which board your opponent plays in next</li>
                <li>• Win 3 small boards in a row to win the game</li>
                <li>• Boards highlighted in blue are available to play</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 UTTT Web. All rights reserved.</p>
          <p className="mt-1">
            Created by Oganesson118 | 
            <a href="#" className="ml-2 text-blue-400 hover:text-blue-300">Documentation</a> |
            <a href="#" className="ml-2 text-blue-400 hover:text-blue-300">Tutorial</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
