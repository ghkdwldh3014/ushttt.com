'use client';

import React, { useState } from 'react';
import { GameMode, TimeControl, VariantMode } from '@/types/game';
import { VARIANT_CONFIGS } from '@/lib/variants';

export default function PlayPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode>('UTTT');
  const [selectedTimeControl, setSelectedTimeControl] = useState<TimeControl>('blitz');
  const [selectedVariant, setSelectedVariant] = useState<VariantMode>('standard');

  const handleQuickPlay = () => {
    // Navigate to game with selected settings
    window.location.href = `/?mode=${selectedMode}&time=${selectedTimeControl}&variant=${selectedVariant}`;
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Play</h1>
          <p className="text-xl text-gray-400">Choose your game settings and start playing</p>
        </header>

        <div className="space-y-8">
          {/* Game Mode Selection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Game Mode</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {(['UTTT', 'STTT', 'HTTT'] as GameMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    selectedMode === mode
                      ? 'bg-blue-900/50 border-blue-500'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{mode}</h3>
                  <p className="text-sm text-gray-400">
                    {mode === 'UTTT' && 'Tic Tac Toe within Tic Tac Toe'}
                    {mode === 'STTT' && '3 levels of nested boards'}
                    {mode === 'HTTT' && '4 levels of nested boards'}
                  </p>
                </button>
              ))}
            </div>
          </section>

          {/* Time Control Selection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Time Control</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {(['light', 'hyperbullet', 'bullet', 'blitz', 'rapid', 'ordinary'] as TimeControl[]).map(control => (
                <button
                  key={control}
                  onClick={() => setSelectedTimeControl(control)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTimeControl === control
                      ? 'bg-purple-900/50 border-purple-500'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-lg font-bold capitalize">{control}</h3>
                </button>
              ))}
            </div>
          </section>

          {/* Variant Selection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Variant Mode</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {VARIANT_CONFIGS.map(variant => (
                <button
                  key={variant.mode}
                  onClick={() => setSelectedVariant(variant.mode)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedVariant === variant.mode
                      ? 'bg-green-900/50 border-green-500'
                      : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold">{variant.nameKo}</h3>
                    {!variant.ratingAffected && (
                      <span className="text-xs px-2 py-1 bg-yellow-600 rounded">
                        Unrated
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{variant.descriptionKo}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Play Button */}
          <div className="text-center pt-8">
            <button
              onClick={handleQuickPlay}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-xl font-bold transition-all transform hover:scale-105"
            >
              Start Game
            </button>
            
            <div className="mt-4 text-sm text-gray-400">
              Selected: {selectedMode} • {selectedTimeControl} • {VARIANT_CONFIGS.find(v => v.mode === selectedVariant)?.nameKo}
            </div>
          </div>

          {/* Game Options */}
          <section className="border-t border-gray-700 pt-8">
            <h2 className="text-2xl font-bold mb-4">Other Options</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="p-6 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors">
                <h3 className="text-xl font-bold mb-2">Play with Friend</h3>
                <p className="text-sm text-gray-400">Create a private game and invite your friends</p>
              </button>
              
              <button className="p-6 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors">
                <h3 className="text-xl font-bold mb-2">Play vs AI</h3>
                <p className="text-sm text-gray-400">Practice against AI opponents</p>
              </button>
              
              <button className="p-6 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors">
                <h3 className="text-xl font-bold mb-2">Tutorial</h3>
                <p className="text-sm text-gray-400">Learn how to play UTTT</p>
              </button>
              
              <button className="p-6 bg-gray-800 hover:bg-gray-750 rounded-lg text-left transition-colors">
                <h3 className="text-xl font-bold mb-2">Guest Play</h3>
                <p className="text-sm text-gray-400">Play without logging in (not saved)</p>
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
