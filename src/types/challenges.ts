// Challenge and Achievement Types

export type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'permanent';
export type ChallengeStatus = 'locked' | 'active' | 'completed';

export interface Challenge {
  id: string;
  type: ChallengeType;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  reward: number;
  requirement: any; // Will vary based on challenge
  progress?: number;
  target?: number;
  status: ChallengeStatus;
  completedAt?: number;
}

// Daily Challenges (100 points each, +200 for all)
export const DAILY_CHALLENGES: Omit<Challenge, 'id' | 'status' | 'progress'>[] = [
  {
    type: 'daily',
    name: 'Speed Demon',
    nameKo: '빠른 승부사',
    description: 'Win 3 games in under 30 seconds each',
    descriptionKo: '30초 이내로 게임 3판 승리',
    reward: 100,
    requirement: { type: 'speed_wins', count: 3, maxTime: 30 },
    target: 3,
  },
  {
    type: 'daily',
    name: 'Win Streak',
    nameKo: '연승 도전',
    description: 'Achieve a 3-game win streak today',
    descriptionKo: '오늘 3연승 달성',
    reward: 100,
    requirement: { type: 'win_streak', count: 3 },
    target: 3,
  },
  {
    type: 'daily',
    name: 'Variety Seeker',
    nameKo: '다양성 추구',
    description: 'Win with 3 different time controls',
    descriptionKo: '3가지 다른 시간 제한으로 각각 승리',
    reward: 100,
    requirement: { type: 'variety_wins', count: 3 },
    target: 3,
  },
  {
    type: 'daily',
    name: 'Analyst',
    nameKo: '분석왕',
    description: 'Analyze 2 lost games',
    descriptionKo: '패배한 게임 2개 분석 완료',
    reward: 100,
    requirement: { type: 'analyze_losses', count: 2 },
    target: 2,
  },
];

// Weekly Challenges (300 points each, +500 for all)
export const WEEKLY_CHALLENGES: Omit<Challenge, 'id' | 'status' | 'progress'>[] = [
  {
    type: 'weekly',
    name: 'Victory God',
    nameKo: '승부의 신',
    description: 'Maintain 70%+ win rate (min 20 games)',
    descriptionKo: '주간 승률 70% 이상 유지 (최소 20게임)',
    reward: 300,
    requirement: { type: 'win_rate', rate: 0.7, minGames: 20 },
    target: 70,
  },
  {
    type: 'weekly',
    name: 'Marathoner',
    nameKo: '마라토너',
    description: 'Play 10 hours this week',
    descriptionKo: '이번 주 총 플레이 시간 10시간 달성',
    reward: 300,
    requirement: { type: 'play_time', hours: 10 },
    target: 600, // 10 hours in minutes
  },
  {
    type: 'weekly',
    name: 'All-Rounder',
    nameKo: '올라운더',
    description: 'Win 3 games in each mode (UTTT, STTT, HTTT)',
    descriptionKo: 'Ultimate, Super, Hyper 각각에서 3승씩',
    reward: 300,
    requirement: { type: 'mode_wins', modes: ['UTTT', 'STTT', 'HTTT'], count: 3 },
    target: 9,
  },
  {
    type: 'weekly',
    name: 'Clutch Master',
    nameKo: '클러치 마스터',
    description: 'Win 5 games with less than 10 seconds remaining',
    descriptionKo: '시간 10초 이하 상황에서 5번 승리',
    reward: 300,
    requirement: { type: 'clutch_wins', count: 5, maxTime: 10 },
    target: 5,
  },
  {
    type: 'weekly',
    name: 'Revenge Hunter',
    nameKo: '리벤지 헌터',
    description: 'Beat the same opponent 3+ times',
    descriptionKo: '같은 상대에게 3번 이상 승리',
    reward: 300,
    requirement: { type: 'revenge', count: 3 },
    target: 3,
  },
];

// Monthly Challenges (700 points each, +1000 for all)
export const MONTHLY_CHALLENGES: Omit<Challenge, 'id' | 'status' | 'progress'>[] = [
  {
    type: 'monthly',
    name: 'Rating Climber',
    nameKo: '레이팅 클라이머',
    description: 'Gain 1000+ rating this month',
    descriptionKo: '이번 달 레이팅 1000점 이상 상승',
    reward: 700,
    requirement: { type: 'rating_gain', points: 1000 },
    target: 1000,
  },
  {
    type: 'monthly',
    name: 'Iron Will',
    nameKo: '철인왕',
    description: 'Play at least 1 game every day this month',
    descriptionKo: '한 달 동안 매일 최소 1게임씩 플레이',
    reward: 700,
    requirement: { type: 'daily_streak', days: 30 },
    target: 30,
  },
  {
    type: 'monthly',
    name: 'Puzzle Master',
    nameKo: '퍼즐 마스터',
    description: 'Solve all 30 monthly puzzles',
    descriptionKo: '월간 퍼즐 30개 모두 해결',
    reward: 700,
    requirement: { type: 'puzzles', count: 30 },
    target: 30,
  },
  {
    type: 'monthly',
    name: 'Social Player',
    nameKo: '소셜 플레이어',
    description: 'Play 50+ games with friends',
    descriptionKo: '친구와 50게임 이상 플레이',
    reward: 700,
    requirement: { type: 'friend_games', count: 50 },
    target: 50,
  },
  {
    type: 'monthly',
    name: 'Tournament Fighter',
    nameKo: '토너먼트 파이터',
    description: 'Finish in top 10% of a tournament',
    descriptionKo: '토너먼트에서 상위 10% 진입',
    reward: 700,
    requirement: { type: 'tournament_rank', percentile: 0.1 },
    target: 10,
  },
];

// Permanent Achievements
export const PERMANENT_ACHIEVEMENTS: Omit<Challenge, 'id' | 'status' | 'progress'>[] = [
  // Victory Related
  {
    type: 'permanent',
    name: 'First Steps',
    nameKo: '첫 걸음',
    description: 'Win your first game',
    descriptionKo: '첫 승리 달성',
    reward: 100,
    requirement: { type: 'total_wins', count: 1 },
    target: 1,
  },
  {
    type: 'permanent',
    name: 'Century',
    nameKo: '백승',
    description: 'Win 100 games',
    descriptionKo: '100승 달성',
    reward: 1000,
    requirement: { type: 'total_wins', count: 100 },
    target: 100,
  },
  {
    type: 'permanent',
    name: 'Millennial',
    nameKo: '천승',
    description: 'Win 1000 games',
    descriptionKo: '천승 (1,000승) 달성',
    reward: 10000,
    requirement: { type: 'total_wins', count: 1000 },
    target: 1000,
  },
  {
    type: 'permanent',
    name: 'Ten Thousand',
    nameKo: '만승',
    description: 'Win 10000 games',
    descriptionKo: '만승 (10,000승) 달성',
    reward: 100000,
    requirement: { type: 'total_wins', count: 10000 },
    target: 10000,
  },
  
  // Win Streak
  {
    type: 'permanent',
    name: 'Streak 5',
    nameKo: '5연승',
    description: '5 win streak',
    descriptionKo: '5연승 달성',
    reward: 500,
    requirement: { type: 'max_streak', count: 5 },
    target: 5,
  },
  {
    type: 'permanent',
    name: 'Streak 10',
    nameKo: '10연승',
    description: '10 win streak',
    descriptionKo: '10연승 달성',
    reward: 2000,
    requirement: { type: 'max_streak', count: 10 },
    target: 10,
  },
  {
    type: 'permanent',
    name: 'Streak 20',
    nameKo: '20연승',
    description: '20 win streak',
    descriptionKo: '20연승 달성',
    reward: 10000,
    requirement: { type: 'max_streak', count: 20 },
    target: 20,
  },
  {
    type: 'permanent',
    name: 'Streak Legend',
    nameKo: '50연승 전설',
    description: '50 win streak',
    descriptionKo: '50연승 달성',
    reward: 50000,
    requirement: { type: 'max_streak', count: 50 },
    target: 50,
  },
  
  // Special Achievements
  {
    type: 'permanent',
    name: 'Extreme Situation',
    nameKo: '극한 상황',
    description: 'Win with less than 1 second remaining',
    descriptionKo: '1초 이하 남은 상황에서 승리',
    reward: 5000,
    requirement: { type: 'extreme_clutch', maxTime: 1 },
    target: 1,
  },
  {
    type: 'permanent',
    name: 'Counter Attack',
    nameKo: '카운터 어택',
    description: 'Win 100 comeback victories',
    descriptionKo: '뒤처진 상황에서 역전승 100회',
    reward: 10000,
    requirement: { type: 'comebacks', count: 100 },
    target: 100,
  },
];
