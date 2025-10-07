'use client';

import React, { useState } from 'react';
import { DAILY_CHALLENGES, WEEKLY_CHALLENGES, MONTHLY_CHALLENGES, PERMANENT_ACHIEVEMENTS } from '@/types/challenges';

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'permanent'>('daily');

  const getChallenges = () => {
    switch (activeTab) {
      case 'daily': return DAILY_CHALLENGES;
      case 'weekly': return WEEKLY_CHALLENGES;
      case 'monthly': return MONTHLY_CHALLENGES;
      case 'permanent': return PERMANENT_ACHIEVEMENTS;
    }
  };

  const getTabColor = (tab: string) => {
    return activeTab === tab ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600';
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Challenges & Achievements</h1>
          <p className="text-gray-400">Complete challenges to earn points and unlock achievements</p>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${getTabColor('daily')}`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${getTabColor('weekly')}`}
          >
            Weekly
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${getTabColor('monthly')}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActiveTab('permanent')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${getTabColor('permanent')}`}
          >
            Permanent
          </button>
        </div>

        {/* Challenge Info */}
        {activeTab === 'daily' && (
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
            <p className="text-sm">각 챌린지: 100 포인트 | 모두 완료: +200 포인트 보너스</p>
          </div>
        )}
        {activeTab === 'weekly' && (
          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4 mb-6">
            <p className="text-sm">각 챌린지: 300 포인트 | 모두 완료: +500 포인트 보너스</p>
          </div>
        )}
        {activeTab === 'monthly' && (
          <div className="bg-pink-900/30 border border-pink-700 rounded-lg p-4 mb-6">
            <p className="text-sm">각 챌린지: 700 포인트 | 모두 완료: +1000 포인트 보너스</p>
          </div>
        )}

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {getChallenges().map((challenge, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{challenge.nameKo}</h3>
                <span className="px-3 py-1 bg-yellow-600 rounded-full text-sm font-bold">
                  {challenge.reward} pts
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{challenge.descriptionKo}</p>
              
              {challenge.target && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>0 / {challenge.target}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-gray-700 rounded font-semibold">
                  Not Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
