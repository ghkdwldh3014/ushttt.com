'use client';

import React from 'react';
import { TierBadge } from '@/components/Profile/TierBadge';
import { SubscriptionBadge } from '@/components/Profile/SubscriptionBadge';

export default function ProfilePage() {
  // Mock user data
  const user = {
    username: 'Oganesson118',
    displayName: 'Oganesson118',
    subscription: 'hyper' as const,
    points: 100000000,
    mileage: 28000,
    vipLevel: 'gold' as const,
    joinDate: '2025-01-01',
    lastLogin: '2025-10-06',
  };

  const ratings = [
    { mode: 'UTTT', timeControl: 'blitz', rating: 8523, tier: 'pink' as const, games: 1481, wins: 1247, losses: 234 },
    { mode: 'UTTT', timeControl: 'bullet', rating: 7892, tier: 'orange' as const, games: 856, wins: 642, losses: 214 },
    { mode: 'STTT', timeControl: 'blitz', rating: 6234, tier: 'yellow' as const, games: 234, wins: 156, losses: 78 },
    { mode: 'HTTT', timeControl: 'light', rating: 5432, tier: 'green' as const, games: 67, wins: 42, losses: 25 },
  ];

  const recentAchievements = [
    { name: '빠른 승부사', date: '2025-10-06', points: 100 },
    { name: '연승 도전', date: '2025-10-05', points: 100 },
    { name: '20연승', date: '2025-10-04', points: 10000 },
    { name: '클러치 마스터', date: '2025-10-03', points: 300 },
  ];

  const vipColors = {
    none: 'text-gray-400',
    bronze: 'text-amber-600',
    silver: 'text-gray-300',
    gold: 'text-yellow-400',
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-lg p-8 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-bold">{user.displayName}</h1>
                <SubscriptionBadge tier={user.subscription} size="md" />
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-semibold ${vipColors[user.vipLevel]}`}>
                  {user.vipLevel.toUpperCase()} VIP
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">Joined {user.joinDate}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-300">Last seen {user.lastLogin}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {user.points.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Points</div>
              <div className="text-sm text-gray-300 mt-2">
                {user.mileage.toLocaleString()} mileage
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">1,481</div>
            <div className="text-sm text-gray-400">Total Games</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">84.2%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">23</div>
            <div className="text-sm text-gray-400">Max Win Streak</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-2">127</div>
            <div className="text-sm text-gray-400">Achievements</div>
          </div>
        </div>

        {/* Ratings */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Ratings</h2>
          <div className="space-y-4">
            {ratings.map((rating, idx) => {
              const winRate = ((rating.wins / rating.games) * 100).toFixed(1);
              return (
                <div key={idx} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <h3 className="text-xl font-semibold">
                        {rating.mode} - {rating.timeControl}
                      </h3>
                      <TierBadge tier={rating.tier} rating={rating.rating} />
                    </div>
                    <div className="text-sm text-gray-400">
                      {rating.games} games
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">W/L: </span>
                      <span className="text-green-400">{rating.wins}</span>
                      {' / '}
                      <span className="text-red-400">{rating.losses}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Win Rate: </span>
                      <span className="text-white font-semibold">{winRate}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Rating: </span>
                      <span className="text-white font-semibold">{rating.rating}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Recent Achievements */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recent Achievements</h2>
          <div className="bg-gray-800 rounded-lg divide-y divide-gray-700">
            {recentAchievements.map((achievement, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-750 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <div className="font-semibold">{achievement.name}</div>
                    <div className="text-sm text-gray-400">{achievement.date}</div>
                  </div>
                </div>
                <div className="text-yellow-400 font-bold">
                  +{achievement.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
