'use client';

import React from 'react';
import { Header } from '@/components/Navigation/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">UTTT Web</h3>
              <p className="text-sm text-gray-400">
                The ultimate platform for playing Ultimate Tic Tac Toe and its variants.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Game</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/play" className="hover:text-white">Play Now</a></li>
                <li><a href="/tournaments" className="hover:text-white">Tournaments</a></li>
                <li><a href="/leaderboard" className="hover:text-white">Leaderboard</a></li>
                <li><a href="/challenges" className="hover:text-white">Challenges</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Discord</a></li>
                <li><a href="#" className="hover:text-white">Forums</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Account</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/profile" className="hover:text-white">Profile</a></li>
                <li><a href="/subscription" className="hover:text-white">Subscribe</a></li>
                <li><a href="/shop" className="hover:text-white">Shop</a></li>
                <li><a href="#" className="hover:text-white">Settings</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
            <p>© 2025 UTTT Web. All rights reserved.</p>
            <p className="mt-2">
              Created by Oganesson118 | 
              <a href="https://uttt.ai" className="ml-2 text-blue-400 hover:text-blue-300">Analysis by uttt.ai</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
