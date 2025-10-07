'use client';

import React from 'react';
import { SUBSCRIPTION_TIERS } from '@/lib/subscription';

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-400">Get more from your UTTT experience</p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Free Tier */}
          <div className="bg-gray-800 rounded-lg p-6 border-2 border-gray-700">
            <h2 className="text-2xl font-bold mb-2">Free</h2>
            <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400">/mo</span></div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm">분석 하루 최대 2번</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm">퍼즐 하루 5개</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm">게임 기록 20개 저장</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-sm">변형 UTTT 하루 1번</span>
              </li>
            </ul>

            <button className="w-full py-3 bg-gray-700 rounded-lg font-semibold">
              Current Plan
            </button>
          </div>

          {/* Ultimate Supporter */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg p-6 border-2 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Ultimate</h2>
              <span className="text-xl">⚡</span>
            </div>
            <div className="text-4xl font-bold mb-6">$5<span className="text-lg text-gray-300">/mo</span></div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">분석 하루 최대 5번</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">퍼즐 하루 20개</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">광고 제거</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">매칭 시간 단축</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">게임 기록 100개 저장</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">기본 테마 팩 5종</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">변형 UTTT 하루 5번</span>
              </li>
            </ul>

            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>

          {/* Super Supporter */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg p-6 border-2 border-purple-500 transform scale-105">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Super</h2>
              <span className="text-xl">⭐</span>
            </div>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold">$10</span>
              <span className="text-lg text-gray-300">/mo</span>
              <span className="ml-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">POPULAR</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">분석 무제한</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">퍼즐 무제한</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">상세 통계 대시보드</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">포지션 분석</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">프리미엄 테마 팩 15종</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">게임 기록 무제한</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">커스텀 봇 하루 3번</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">변형 UTTT 하루 10번</span>
              </li>
            </ul>

            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>

          {/* Hyper Supporter */}
          <div className="bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 rounded-lg p-6 border-2 border-pink-500">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Hyper</h2>
              <span className="text-xl">👑</span>
            </div>
            <div className="text-4xl font-bold mb-6">$30<span className="text-lg text-gray-300">/mo</span></div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm font-bold">All Super benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">AI 전문 코치</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">커스텀 봇 무제한</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">변형 UTTT 무제한</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">모든 테마 25종+</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">개인 전용 연습 방</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">월 2회 프로 레슨 (준비중)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">베타 기능 우선 체험</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-sm">신규 기능 투표권</span>
              </li>
            </ul>

            <button className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* VIP Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center">VIP Loyalty Program</h2>
          <p className="text-center text-gray-400 mb-8">
            모든 패키지 구매 시 1$당 100마일리지 적립 (6개월 유지)
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-2">Bronze VIP</h3>
              <div className="text-lg mb-4">3,500 mileage</div>
              <ul className="space-y-2 text-sm">
                <li>• 신규 패키지 24시간 먼저 구매</li>
                <li>• VIP 전용 10% 할인 쿠폰 월 1회</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg p-6 text-gray-900">
              <h3 className="text-2xl font-bold mb-2">Silver VIP</h3>
              <div className="text-lg mb-4">10,500 mileage</div>
              <ul className="space-y-2 text-sm">
                <li>• 모든 브론즈 혜택</li>
                <li>• 모든 패키지 10% 자동 할인</li>
                <li>• 베타 패키지 테스트 참여 권한</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg p-6 text-gray-900">
              <h3 className="text-2xl font-bold mb-2">Gold VIP</h3>
              <div className="text-lg mb-4">28,000 mileage</div>
              <ul className="space-y-2 text-sm">
                <li>• 모든 실버 혜택</li>
                <li>• 모든 패키지 20% 자동 할인</li>
                <li>• 커스텀 패키지 제작 요청권 연 2회</li>
                <li>• 개발팀 직접 피드백 세션</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
