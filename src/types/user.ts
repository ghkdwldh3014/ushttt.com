// User and Profile Types

export type Tier = 
  | 'black' 
  | 'gray' 
  | 'white' 
  | 'brown' 
  | 'purple' 
  | 'blue' 
  | 'light-blue' 
  | 'green' 
  | 'light-green' 
  | 'yellow' 
  | 'orange' 
  | 'pink' 
  | 'red' 
  | 'master';

export type SubscriptionTier = 'free' | 'ultimate' | 'super' | 'hyper';

export interface TierConfig {
  name: Tier;
  minRating: number;
  maxRating: number;
  firstAchievementBonus: number;
}

export const TIER_CONFIGS: TierConfig[] = [
  { name: 'black', minRating: 0, maxRating: 1999, firstAchievementBonus: 0 },
  { name: 'gray', minRating: 2000, maxRating: 2499, firstAchievementBonus: 0 },
  { name: 'white', minRating: 2500, maxRating: 2999, firstAchievementBonus: 100 },
  { name: 'brown', minRating: 3000, maxRating: 3499, firstAchievementBonus: 200 },
  { name: 'purple', minRating: 3500, maxRating: 3999, firstAchievementBonus: 400 },
  { name: 'blue', minRating: 4000, maxRating: 4499, firstAchievementBonus: 800 },
  { name: 'light-blue', minRating: 4500, maxRating: 4999, firstAchievementBonus: 1600 },
  { name: 'green', minRating: 5000, maxRating: 5499, firstAchievementBonus: 3200 },
  { name: 'light-green', minRating: 5500, maxRating: 5999, firstAchievementBonus: 6400 },
  { name: 'yellow', minRating: 6000, maxRating: 6999, firstAchievementBonus: 12800 },
  { name: 'orange', minRating: 7000, maxRating: 7999, firstAchievementBonus: 25600 },
  { name: 'pink', minRating: 8000, maxRating: 8999, firstAchievementBonus: 51200 },
  { name: 'red', minRating: 9000, maxRating: 9999, firstAchievementBonus: 102400 },
  { name: 'master', minRating: 10000, maxRating: Infinity, firstAchievementBonus: 204800 },
];

export interface Rating {
  mode: string; // "UTTT-bullet", "STTT-blitz", etc.
  rating: number;
  tier: Tier;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email?: string;
  displayName: string;
  avatar?: string;
  subscription: SubscriptionTier;
  points: number;
  mileage: number;
  vipLevel: 'none' | 'bronze' | 'silver' | 'gold';
  ratings: Rating[];
  createdAt: number;
  lastLogin: number;
  achievements: string[];
  firstTierAchievements: Set<string>; // Track first time reaching each tier for each mode
}

export interface VIPConfig {
  level: 'bronze' | 'silver' | 'gold';
  requiredMileage: number;
  benefits: string[];
  discount: number;
}

export const VIP_CONFIGS: VIPConfig[] = [
  {
    level: 'bronze',
    requiredMileage: 3500,
    benefits: [
      '신규 패키지 24시간 먼저 구매 가능',
      'VIP 전용 10% 할인 쿠폰 월 1회 제공',
    ],
    discount: 0,
  },
  {
    level: 'silver',
    requiredMileage: 10500,
    benefits: [
      '모든 브론즈 혜택',
      '모든 패키지 10% 자동 할인',
      '베타 패키지 테스트 참여 권한',
    ],
    discount: 0.1,
  },
  {
    level: 'gold',
    requiredMileage: 28000,
    benefits: [
      '모든 실버 혜택',
      '모든 패키지 20% 자동 할인',
      '커스텀 패키지 제작 요청권 연 2회',
      '프리미엄 패키지 무료 체험 월 1회',
      '개발팀과의 직접 피드백 세션',
    ],
    discount: 0.2,
  },
];
