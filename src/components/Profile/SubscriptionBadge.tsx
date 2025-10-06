'use client';

import React from 'react';
import { SubscriptionTier } from '@/types/user';

interface SubscriptionBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md' | 'lg';
}

export function SubscriptionBadge({ tier, size = 'sm' }: SubscriptionBadgeProps) {
  if (tier === 'free') return null;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const tierConfig = {
    ultimate: {
      name: 'Ultimate Supporter',
      color: 'bg-blue-600 text-white',
      icon: '⚡',
    },
    super: {
      name: 'Super Supporter',
      color: 'bg-purple-600 text-white',
      icon: '⭐',
    },
    hyper: {
      name: 'Hyper Supporter',
      color: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
      icon: '👑',
    },
  }[tier];

  return (
    <div className={`
      inline-flex items-center gap-1 rounded-full font-semibold
      ${tierConfig.color}
      ${sizeClasses[size]}
    `}>
      <span>{tierConfig.icon}</span>
      <span>{tierConfig.name}</span>
    </div>
  );
}
