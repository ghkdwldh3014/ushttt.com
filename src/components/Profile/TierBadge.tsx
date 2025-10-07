'use client';

import React from 'react';
import { Tier, TIER_CONFIGS } from '@/types/user';

interface TierBadgeProps {
  tier: Tier;
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export function TierBadge({ tier, rating, size = 'md' }: TierBadgeProps) {
  const tierConfig = TIER_CONFIGS.find(t => t.name === tier);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const tierColors: Record<Tier, string> = {
    black: 'bg-gray-900 text-white border-gray-700',
    gray: 'bg-gray-600 text-white border-gray-500',
    white: 'bg-gray-100 text-gray-900 border-gray-300',
    brown: 'bg-amber-800 text-white border-amber-600',
    purple: 'bg-purple-600 text-white border-purple-500',
    blue: 'bg-blue-600 text-white border-blue-500',
    'light-blue': 'bg-cyan-400 text-gray-900 border-cyan-300',
    green: 'bg-green-600 text-white border-green-500',
    'light-green': 'bg-lime-400 text-gray-900 border-lime-300',
    yellow: 'bg-yellow-400 text-gray-900 border-yellow-300',
    orange: 'bg-orange-500 text-white border-orange-400',
    pink: 'bg-pink-500 text-white border-pink-400',
    red: 'bg-red-600 text-white border-red-500',
    master: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 border-yellow-300 animate-pulse',
  };

  return (
    <div className={`
      inline-flex items-center gap-2 rounded-full border-2 font-semibold
      ${tierColors[tier]}
      ${sizeClasses[size]}
    `}>
      <span className="uppercase">{tier}</span>
      <span className="opacity-80">{rating}</span>
    </div>
  );
}
