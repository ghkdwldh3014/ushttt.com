// Game Types and Interfaces

export type GameMode = 'UTTT' | 'STTT' | 'HTTT';
export type Player = 'X' | 'O' | null;
export type TimeControl = 'light' | 'hyperbullet' | 'bullet' | 'blitz' | 'rapid' | 'ordinary';
export type VariantMode = 'standard' | 'tag-team' | 'countdown-chaos' | 'time-thief' | 'dice-roll' | 'swap-mode';

export interface TimeControlConfig {
  mode: GameMode;
  control: TimeControl;
  minTime: number; // in seconds
  maxTime: number; // in seconds or Infinity
}

export const TIME_CONTROLS: Record<GameMode, Record<TimeControl, { min: number; max: number }>> = {
  UTTT: {
    light: { min: 0, max: 10 },
    hyperbullet: { min: 10, max: 60 },
    bullet: { min: 60, max: 180 },
    blitz: { min: 180, max: 600 },
    rapid: { min: 600, max: 1800 },
    ordinary: { min: 1800, max: Infinity },
  },
  STTT: {
    light: { min: 0, max: 100 },
    hyperbullet: { min: 100, max: 600 },
    bullet: { min: 600, max: 1800 },
    blitz: { min: 1800, max: 6000 },
    rapid: { min: 6000, max: 18000 },
    ordinary: { min: 18000, max: Infinity },
  },
  HTTT: {
    light: { min: 0, max: 1000 },
    hyperbullet: { min: 1000, max: 6000 },
    bullet: { min: 6000, max: 18000 },
    blitz: { min: 18000, max: 60000 },
    rapid: { min: 60000, max: 180000 },
    ordinary: { min: 180000, max: Infinity },
  },
};

export interface Position {
  boards: number[];
}

export interface Move {
  position: number[];
  player: Player;
  timestamp: number;
  timeRemaining: number;
}

export interface GameState {
  id: string;
  mode: GameMode;
  variant: VariantMode;
  timeControl: TimeControl;
  playerX: string;
  playerO: string;
  currentPlayer: Player;
  board: any; // Will be defined based on mode
  moves: Move[];
  winner: Player | 'draw' | null;
  startTime: number;
  playerXTime: number;
  playerOTime: number;
  nextValidBoards: number[] | null; // For UTTT rules
  status: 'waiting' | 'active' | 'finished';
}

export interface SmallBoard {
  cells: Player[];
  winner: Player | null;
}

export interface UTTTBoard {
  boards: SmallBoard[];
  mainWinner: Player | null;
}

export interface STTTBoard {
  boards: UTTTBoard[];
  mainWinner: Player | null;
}

export interface HTTTBoard {
  boards: STTTBoard[];
  mainWinner: Player | null;
}
