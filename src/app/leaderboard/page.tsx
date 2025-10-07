'use client';

import React, { useState } from 'react';
import { TierBadge } from '@/components/Profile/TierBadge';
import { SubscriptionBadge } from '@/components/Profile/SubscriptionBadge';
import { GameMode, TimeControl } from '@/types/game';

export default function LeaderboardPage() {
  const [selectedMode, setSelectedMode] = useState<GameMode>('UTTT');
  const [selectedTimeControl, setSelectedTimeControl] = useState<TimeControl>('blitz');

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, username: 'Oganesson118', rating: 8523, tier: 'pink' as const, subscription: 'hyper' as const, wins: 1247, losses: 234 },
    { rank: 2, username: 'UltimateMaster', rating: 7845, tier: 'orange' as const, subscription: 'super' as const, wins: 982, losses: 189 },
    { rank: 3, username: 'TacTicPro', rating: 7234, tier: 'orange' as const, subscription: 'ultimate' as const, wins: 856, losses: 201 },
    { rank: 4, username: 'GridWarrior', rating: 6789, tier: 'yellow' as const, subscription: 'free' as const, wins: 743, losses: 167 },
    { rank: 5, username: 'NestedNinja', rating: 6456, tier: 'yellow' as const, subscription: 'super' as const, wins: 654, losses: 142 },
    { rank: 6, username: 'BoardDominator', rating: 5987, tier: 'light-green' as const, subscription: 'free' as const, wins: 589, losses: 134 },
    { rank: 7, username: 'SquareStrategist', rating: 5654, tier: 'light-green' as const, subscription: 'ultimate' as const, wins: 523, losses: 128 },
    { rank: 8, username: 'MetaPlayer99', rating: 5321, tier: 'green' as const, subscription: 'free' as const, wins: 478, losses: 119 },
    { rank: 9, username: 'TicTacTitan', rating: 5123, tier: 'green' as const, subscription: 'hyper' as const, wins: 445, losses: 112 },
    { rank: 10, username: 'RecursiveKing', rating: 4987, tier: 'light-blue' as const, subscription: 'free' as const, wins: 412, losses: 105 },
  ];

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-400';
    if (rank === 2) return 'text-gray-300';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-400';
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
          
          {/* Filters */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Game Mode</label>
              <div className="flex gap-2">
                {(['UTTT', 'STTT', 'HTTT'] as GameMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setSelectedMode(mode)}
                    className={`px-4 py-2 rounded font-semibold transition-colors ${
                      selectedMode === mode 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Time Control</label>
              <select
                value={selectedTimeControl}
                onChange={(e) => setSelectedTimeControl(e.target.value as TimeControl)}
                className="w-full px-4 py-2 bg-gray-700 rounded font-semibold"
              >
                <option value="light">Light</option>
                <option value="hyperbullet">Hyper Bullet</option>
                <option value="bullet">Bullet</option>
                <option value="blitz">Blitz</option>
                <option value="rapid">Rapid</option>
                <option value="ordinary">Ordinary</option>
              </select>
            </div>
          </div>
        </header>

        {/* Leaderboard Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">Player</th>
                  <th className="px-6 py-4 text-left">Rating</th>
                  <th className="px-6 py-4 text-left">W/L</th>
                  <th className="px-6 py-4 text-left">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player) => {
                  const winRate = ((player.wins / (player.wins + player.losses)) * 100).toFixed(1);
                  return (
                    <tr 
                      key={player.rank}
                      className="border-t border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                          {getRankBadge(player.rank)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{player.username}</span>
                          <SubscriptionBadge tier={player.subscription} />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <TierBadge tier={player.tier} rating={player.rating} size="sm" />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-green-400">{player.wins}</span>
                        {' / '}
                        <span className="text-red-400">{player.losses}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{winRate}%</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tier Distribution */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Tier Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { tier: 'master', percentage: 0.1 },
              { tier: 'red', percentage: 0.5 },
              { tier: 'pink', percentage: 1.2 },
              { tier: 'orange', percentage: 2.8 },
              { tier: 'yellow', percentage: 5.4 },
              { tier: 'light-green', percentage: 8.9 },
              { tier: 'green', percentage: 12.3 },
              { tier: 'light-blue', percentage: 15.7 },
              { tier: 'blue', percentage: 18.2 },
              { tier: 'purple', percentage: 14.6 },
              { tier: 'brown', percentage: 10.8 },
              { tier: 'white', percentage: 7.2 },
              { tier: 'gray', percentage: 2.1 },
              { tier: 'black', percentage: 0.2 },
            ].map(({ tier, percentage }) => (
              <div key={tier} className="bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-400 mb-2 uppercase">{tier}</div>
                <div className="text-2xl font-bold">{percentage}%</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
