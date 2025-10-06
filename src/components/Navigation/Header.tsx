'use client';

import React from 'react';
import Link from 'next/link';
import { SubscriptionBadge } from '@/components/Profile/SubscriptionBadge';

export function Header() {
  // Mock user data - in production this would come from authentication
  const user = {
    username: 'Oganesson118',
    subscription: 'hyper' as const,
    points: 100000000,
    mileage: 28000,
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            UTTT Web
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Play
            </Link>
            <Link href="/tournaments" className="hover:text-blue-400 transition-colors">
              Tournaments
            </Link>
            <Link href="/challenges" className="hover:text-blue-400 transition-colors">
              Challenges
            </Link>
            <Link href="/leaderboard" className="hover:text-blue-400 transition-colors">
              Leaderboard
            </Link>
            <Link href="/shop" className="hover:text-blue-400 transition-colors">
              Shop
            </Link>
            <Link href="/subscription" className="hover:text-blue-400 transition-colors">
              Subscribe
            </Link>
          </nav>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="font-semibold">{user.username}</span>
                <SubscriptionBadge tier={user.subscription} />
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-yellow-400">{user.points.toLocaleString()}</span> points
              </div>
            </div>
            <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
