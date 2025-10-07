'use client';

import React from 'react';
import { TOURNAMENT_CONFIGS } from '@/types/tournament';

export default function TournamentsPage() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Tournaments</h1>
          <p className="text-gray-400">Compete in scheduled tournaments to prove your skills</p>
        </header>

        {/* UTTT Tournaments */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">UTTT Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOURNAMENT_CONFIGS.filter(t => t.mode === 'UTTT').map((tournament, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold capitalize">{tournament.timeControl}</h3>
                  <span className="px-2 py-1 bg-blue-600 rounded text-sm">
                    {tournament.maxPlayers} max
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div>Frequency: <span className="text-white">{tournament.frequency}</span></div>
                  <div>Entry Fee: <span className="text-yellow-400">{tournament.entryFee} points</span></div>
                </div>

                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors">
                  Join Tournament
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* STTT Tournaments */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">STTT Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOURNAMENT_CONFIGS.filter(t => t.mode === 'STTT').map((tournament, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold capitalize">{tournament.timeControl}</h3>
                  <span className="px-2 py-1 bg-purple-600 rounded text-sm">
                    {tournament.maxPlayers} max
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div>Frequency: <span className="text-white">{tournament.frequency}</span></div>
                  <div>Entry Fee: <span className="text-yellow-400">{tournament.entryFee} points</span></div>
                </div>

                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded font-semibold transition-colors">
                  Join Tournament
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* HTTT Tournaments */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-pink-400">HTTT Tournaments</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOURNAMENT_CONFIGS.filter(t => t.mode === 'HTTT').map((tournament, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold capitalize">{tournament.timeControl}</h3>
                  <span className="px-2 py-1 bg-pink-600 rounded text-sm">
                    {tournament.maxPlayers} max
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300 mb-4">
                  <div>Frequency: <span className="text-white">{tournament.frequency}</span></div>
                  <div>Entry Fee: <span className="text-yellow-400">{tournament.entryFee} points</span></div>
                </div>

                <button className="w-full py-2 bg-pink-600 hover:bg-pink-700 rounded font-semibold transition-colors">
                  Join Tournament
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
