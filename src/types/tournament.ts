// Tournament and Competition Types

import { GameMode, TimeControl } from './game';

export type TournamentFormat = 'single-elimination' | 'double-elimination' | 'league';
export type TournamentStatus = 'waiting' | 'in-progress' | 'finished';

export interface TournamentConfig {
  mode: GameMode;
  timeControl: TimeControl;
  maxPlayers: number;
  frequency: string; // e.g., "5 minutes", "30 minutes", "1 hour"
  frequencyMinutes: number;
  entryFee: number;
}

export const TOURNAMENT_CONFIGS: TournamentConfig[] = [
  // UTTT Tournaments
  { mode: 'UTTT', timeControl: 'light', maxPlayers: 1024, frequency: '5분마다', frequencyMinutes: 5, entryFee: 500 },
  { mode: 'UTTT', timeControl: 'hyperbullet', maxPlayers: 1024, frequency: '30분마다', frequencyMinutes: 30, entryFee: 500 },
  { mode: 'UTTT', timeControl: 'bullet', maxPlayers: 512, frequency: '1시간마다', frequencyMinutes: 60, entryFee: 1000 },
  { mode: 'UTTT', timeControl: 'blitz', maxPlayers: 256, frequency: '3시간마다', frequencyMinutes: 180, entryFee: 1500 },
  { mode: 'UTTT', timeControl: 'rapid', maxPlayers: 64, frequency: '6시간마다', frequencyMinutes: 360, entryFee: 2000 },
  { mode: 'UTTT', timeControl: 'ordinary', maxPlayers: 32, frequency: '1일마다', frequencyMinutes: 1440, entryFee: 2000 },
  
  // STTT Tournaments
  { mode: 'STTT', timeControl: 'light', maxPlayers: 1024, frequency: '1시간마다', frequencyMinutes: 60, entryFee: 500 },
  { mode: 'STTT', timeControl: 'hyperbullet', maxPlayers: 1024, frequency: '5시간마다', frequencyMinutes: 300, entryFee: 1000 },
  { mode: 'STTT', timeControl: 'bullet', maxPlayers: 512, frequency: '10시간마다', frequencyMinutes: 600, entryFee: 1500 },
  { mode: 'STTT', timeControl: 'blitz', maxPlayers: 256, frequency: '36시간마다', frequencyMinutes: 2160, entryFee: 2000 },
  
  // HTTT Tournaments
  { mode: 'HTTT', timeControl: 'light', maxPlayers: 1024, frequency: '1일마다', frequencyMinutes: 1440, entryFee: 1000 },
  { mode: 'HTTT', timeControl: 'hyperbullet', maxPlayers: 1024, frequency: '3일마다', frequencyMinutes: 4320, entryFee: 1500 },
  { mode: 'HTTT', timeControl: 'bullet', maxPlayers: 512, frequency: '1주마다', frequencyMinutes: 10080, entryFee: 2000 },
  { mode: 'HTTT', timeControl: 'blitz', maxPlayers: 256, frequency: '1달마다', frequencyMinutes: 43200, entryFee: 2000 },
];

export interface Tournament {
  id: string;
  mode: GameMode;
  timeControl: TimeControl;
  format: TournamentFormat;
  maxPlayers: number;
  participants: string[]; // User IDs
  status: TournamentStatus;
  startTime: number;
  endTime?: number;
  rounds: TournamentRound[];
  winners: string[]; // Top 3
  entryFee: number;
  tierRestriction?: string; // e.g., "white+" for white tier and above
}

export interface TournamentRound {
  roundNumber: number;
  matches: TournamentMatch[];
  status: 'waiting' | 'in-progress' | 'finished';
}

export interface TournamentMatch {
  id: string;
  player1: string;
  player2: string;
  winner?: string;
  gameId?: string;
}
