'use client';

import React from 'react';
import { GameMode, TimeControl, VariantMode } from '@/types/game';

interface GameInfoProps {
  mode: GameMode;
  timeControl: TimeControl;
  variant?: VariantMode;
  playerX: string;
  playerO: string;
  moveCount: number;
}

const MODE_NAMES: Record<GameMode, string> = {
  UTTT: 'Ultimate Tic Tac Toe',
  STTT: 'Super Tic Tac Toe',
  HTTT: 'Hyper Tic Tac Toe',
};

const TIME_CONTROL_NAMES: Record<TimeControl, string> = {
  light: 'Light',
  hyperbullet: 'Hyper Bullet',
  bullet: 'Bullet',
  blitz: 'Blitz',
  rapid: 'Rapid',
  ordinary: 'Ordinary',
};

const VARIANT_NAMES: Record<VariantMode, string> = {
  standard: 'Standard',
  'tag-team': 'Tag Team',
  'countdown-chaos': 'Countdown Chaos',
  'time-thief': 'Time Thief',
  'dice-roll': 'Dice Roll',
  'swap-mode': 'Swap Mode',
};

export function GameInfo({ 
  mode, 
  timeControl, 
  variant = 'standard',
  playerX, 
  playerO,
  moveCount 
}: GameInfoProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">{MODE_NAMES[mode]}</h2>
        <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
          {TIME_CONTROL_NAMES[timeControl]}
        </span>
      </div>
      
      {variant !== 'standard' && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Variant:</span>
          <span className="px-2 py-1 bg-purple-600 rounded text-sm">
            {VARIANT_NAMES[variant]}
          </span>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-700">
        <div>
          <div className="text-xs text-gray-400 mb-1">Player X</div>
          <div className="font-semibold text-blue-400">{playerX}</div>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Player O</div>
          <div className="font-semibold text-red-400">{playerO}</div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          Move: <span className="text-white font-semibold">{moveCount}</span>
        </div>
      </div>
    </div>
  );
}
