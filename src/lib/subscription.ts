// Subscription and Monetization Logic

import { SubscriptionTier } from '@/types/user';

export interface SubscriptionBenefits {
  tier: SubscriptionTier;
  price: number; // USD per month
  analysisPerDay: number | 'unlimited';
  puzzlesPerDay: number | 'unlimited';
  maxGameRecords: number | 'unlimited';
  variantGamesPerDay: number | 'unlimited';
  adFree: boolean;
  matchingPriority: boolean;
  themes: number;
  customBot: number | 'unlimited';
  badge: boolean;
  tournamentFreeEntries: number;
  customRoom: boolean;
  proLessons: number; // per month
  betaAccess: boolean;
  customMatchingRange: boolean;
  votingRights: boolean;
}

export const SUBSCRIPTION_TIERS: Record<SubscriptionTier, SubscriptionBenefits> = {
  free: {
    tier: 'free',
    price: 0,
    analysisPerDay: 2,
    puzzlesPerDay: 5,
    maxGameRecords: 20,
    variantGamesPerDay: 1,
    adFree: false,
    matchingPriority: false,
    themes: 1,
    customBot: 0,
    badge: false,
    tournamentFreeEntries: 0,
    customRoom: false,
    proLessons: 0,
    betaAccess: false,
    customMatchingRange: false,
    votingRights: false,
  },
  ultimate: {
    tier: 'ultimate',
    price: 5,
    analysisPerDay: 5,
    puzzlesPerDay: 20,
    maxGameRecords: 100,
    variantGamesPerDay: 5,
    adFree: true,
    matchingPriority: true,
    themes: 5,
    customBot: 0,
    badge: true,
    tournamentFreeEntries: 1,
    customRoom: false,
    proLessons: 0,
    betaAccess: false,
    customMatchingRange: false,
    votingRights: false,
  },
  super: {
    tier: 'super',
    price: 10,
    analysisPerDay: 'unlimited',
    puzzlesPerDay: 'unlimited',
    maxGameRecords: 'unlimited',
    variantGamesPerDay: 10,
    adFree: true,
    matchingPriority: true,
    themes: 15,
    customBot: 3,
    badge: true,
    tournamentFreeEntries: 3,
    customRoom: false,
    proLessons: 0,
    betaAccess: false,
    customMatchingRange: true,
    votingRights: false,
  },
  hyper: {
    tier: 'hyper',
    price: 30,
    analysisPerDay: 'unlimited',
    puzzlesPerDay: 'unlimited',
    maxGameRecords: 'unlimited',
    variantGamesPerDay: 'unlimited',
    adFree: true,
    matchingPriority: true,
    themes: 25,
    customBot: 'unlimited',
    badge: true,
    tournamentFreeEntries: 999999, // Unlimited
    customRoom: true,
    proLessons: 2,
    betaAccess: true,
    customMatchingRange: true,
    votingRights: true,
  },
};

export interface PointPackage {
  price: number; // USD
  points: number;
  mileage: number;
}

export const POINT_PACKAGES: PointPackage[] = [
  { price: 5, points: 15000, mileage: 500 },
  { price: 10, points: 33000, mileage: 1000 },
  { price: 20, points: 67500, mileage: 2000 },
  { price: 50, points: 200000, mileage: 5000 },
  { price: 100, points: 450000, mileage: 10000 },
  { price: 200, points: 1000000, mileage: 20000 },
];

export interface ShopItem {
  id: string;
  name: string;
  nameKo: string;
  cost: number; // in points
  type: 'club' | 'avatar' | 'analysis' | 'matching' | 'tournament-entry';
  dailyLimit?: number;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'club-creation',
    name: 'Club Creation',
    nameKo: '클럽 생성',
    cost: 50000,
    type: 'club',
  },
  {
    id: 'custom-avatar-basic',
    name: 'Custom Avatar (Basic)',
    nameKo: '커스텀 아바타 (기본)',
    cost: 1000,
    type: 'avatar',
  },
  {
    id: 'custom-avatar-premium',
    name: 'Custom Avatar (Premium)',
    nameKo: '커스텀 아바타 (프리미엄)',
    cost: 5000,
    type: 'avatar',
  },
  {
    id: 'extra-analysis',
    name: 'Extra Analysis',
    nameKo: '분석 1회 추가',
    cost: 200,
    type: 'analysis',
    dailyLimit: 3,
  },
  {
    id: 'matching-priority',
    name: 'Matching Priority',
    nameKo: '매칭 우선권',
    cost: 100,
    type: 'matching',
    dailyLimit: 5,
  },
  {
    id: 'tournament-entry-500',
    name: 'Tournament Entry (Small)',
    nameKo: '토너먼트 입장료 (소형)',
    cost: 500,
    type: 'tournament-entry',
  },
  {
    id: 'tournament-entry-1000',
    name: 'Tournament Entry (Medium)',
    nameKo: '토너먼트 입장료 (중형)',
    cost: 1000,
    type: 'tournament-entry',
  },
  {
    id: 'tournament-entry-2000',
    name: 'Tournament Entry (Large)',
    nameKo: '토너먼트 입장료 (대형)',
    cost: 2000,
    type: 'tournament-entry',
  },
];

/**
 * Calculate points earned from a game win
 */
export function calculateGamePoints(opponentRating: number): number {
  return Math.round(opponentRating / 10);
}

/**
 * Calculate mileage from purchase
 */
export function calculateMileage(dollarAmount: number): number {
  return dollarAmount * 100;
}

/**
 * Check if user can afford an item
 */
export function canAfford(userPoints: number, itemCost: number): boolean {
  return userPoints >= itemCost;
}

/**
 * Get VIP level from mileage
 */
export function getVIPLevel(mileage: number): 'none' | 'bronze' | 'silver' | 'gold' {
  if (mileage >= 28000) return 'gold';
  if (mileage >= 10500) return 'silver';
  if (mileage >= 3500) return 'bronze';
  return 'none';
}

/**
 * Get discount for VIP level
 */
export function getVIPDiscount(vipLevel: 'none' | 'bronze' | 'silver' | 'gold'): number {
  if (vipLevel === 'gold') return 0.2;
  if (vipLevel === 'silver') return 0.1;
  return 0;
}
