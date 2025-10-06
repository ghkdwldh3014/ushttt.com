// Variant Game Mode Logic

import { Player, VariantMode } from '@/types/game';

export interface VariantConfig {
  mode: VariantMode;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  ratingAffected: boolean;
}

export const VARIANT_CONFIGS: VariantConfig[] = [
  {
    mode: 'standard',
    name: 'Standard',
    nameKo: '표준',
    description: 'Classic UTTT rules',
    descriptionKo: '클래식 UTTT 규칙',
    ratingAffected: true,
  },
  {
    mode: 'tag-team',
    name: 'Tag Team',
    nameKo: '태그 팀',
    description: 'Switch teammates every turn',
    descriptionKo: '매 턴마다 팀원 교체',
    ratingAffected: false,
  },
  {
    mode: 'countdown-chaos',
    name: 'Countdown Chaos',
    nameKo: '카운트다운 혼돈',
    description: 'Random placement when countdown reaches 0',
    descriptionKo: '카운트다운 시간이 0이 되면 랜덤 위치에 자동으로 수가 놓임',
    ratingAffected: false,
  },
  {
    mode: 'time-thief',
    name: 'Time Thief',
    nameKo: '시간 도둑',
    description: 'Special squares steal 25% of opponent time',
    descriptionKo: '상대방 시간의 25%를 훔쳐올 수 있는 특수 칸 생성',
    ratingAffected: false,
  },
  {
    mode: 'dice-roll',
    name: 'Dice Roll',
    nameKo: '주사위 굴리기',
    description: 'Roll dice to determine playable zones',
    descriptionKo: '매턴 주사위를 굴려서 둘 수 있는 구역 결정',
    ratingAffected: false,
  },
  {
    mode: 'swap-mode',
    name: 'Swap Mode',
    nameKo: '스왑 모드',
    description: 'X and O roles swap every 5 turns',
    descriptionKo: '매 5턴마다 X와 O 역할이 바뀜',
    ratingAffected: false,
  },
];

/**
 * Calculate countdown chaos reduction percentage
 */
export function getCountdownReduction(mode: 'UTTT' | 'STTT' | 'HTTT'): number {
  const reductions = {
    UTTT: 0.03,  // 3%
    STTT: 0.003, // 0.3%
    HTTT: 0,     // Not available for HTTT
  };
  return reductions[mode];
}

/**
 * Get number of time thief squares
 */
export function getTimeThiefSquares(mode: 'UTTT' | 'STTT' | 'HTTT'): number {
  const squares = {
    UTTT: 18,   // 18 squares
    STTT: 162,  // 162 squares
    HTTT: 0,    // Not available for HTTT
  };
  return squares[mode];
}

/**
 * Generate random positions for time thief squares
 */
export function generateTimeThiefPositions(mode: 'UTTT' | 'STTT'): number[][] {
  const count = getTimeThiefSquares(mode);
  const positions: number[][] = [];
  const used = new Set<string>();

  while (positions.length < count) {
    let position: number[];
    
    if (mode === 'UTTT') {
      position = [
        Math.floor(Math.random() * 9), // board index
        Math.floor(Math.random() * 9), // cell index
      ];
    } else { // STTT
      position = [
        Math.floor(Math.random() * 9),  // board index
        Math.floor(Math.random() * 9),  // sub-board index
        Math.floor(Math.random() * 9),  // cell index
      ];
    }

    const key = position.join(',');
    if (!used.has(key)) {
      used.add(key);
      positions.push(position);
    }
  }

  return positions;
}

/**
 * Check if a position is a time thief square
 */
export function isTimeThiefSquare(position: number[], timeThiefPositions: number[][]): boolean {
  return timeThiefPositions.some(tp => 
    tp.length === position.length && tp.every((val, idx) => val === position[idx])
  );
}

/**
 * Steal time from opponent (25% of remaining time)
 */
export function stealTime(opponentTime: number): { stolen: number; remaining: number } {
  const stolen = Math.floor(opponentTime * 0.25);
  return {
    stolen,
    remaining: opponentTime - stolen,
  };
}

/**
 * Roll dice for dice-roll variant
 * Returns array of valid board indices (1-6 from dice roll)
 */
export function rollDice(): number[] {
  const roll1 = Math.floor(Math.random() * 6) + 1; // 1-6
  const roll2 = Math.floor(Math.random() * 6) + 1; // 1-6
  
  // Convert to board indices (0-8)
  // If sum > 9, wrap around
  const validBoards = [
    (roll1 - 1) % 9,
    (roll2 - 1) % 9,
  ];
  
  return [...new Set(validBoards)]; // Remove duplicates
}

/**
 * Check if players should swap in swap-mode variant
 */
export function shouldSwapPlayers(turnCount: number): boolean {
  return turnCount > 0 && turnCount % 5 === 0;
}

/**
 * Swap player identities
 */
export function getSwappedPlayer(player: Player, turnCount: number): Player {
  if (!player) return null;
  
  const swapCount = Math.floor(turnCount / 5);
  if (swapCount % 2 === 0) {
    return player; // No swap or even swaps
  }
  return player === 'X' ? 'O' : 'X'; // Odd swaps
}

/**
 * Generate random valid move for countdown chaos
 */
export function generateRandomMove(
  validBoards: number[] | null,
  boardState: any,
  mode: 'UTTT' | 'STTT' | 'HTTT'
): number[] | null {
  if (mode === 'UTTT') {
    const boards = validBoards || [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const availableBoards = boards.filter(b => 
      boardState.boards[b].winner === null
    );
    
    if (availableBoards.length === 0) return null;
    
    const randomBoard = availableBoards[Math.floor(Math.random() * availableBoards.length)];
    const availableCells = boardState.boards[randomBoard].cells
      .map((cell: Player, idx: number) => cell === null ? idx : null)
      .filter((idx: number | null) => idx !== null);
    
    if (availableCells.length === 0) return null;
    
    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    return [randomBoard, randomCell];
  }
  
  // Similar logic for STTT and HTTT
  return null;
}

/**
 * Tag team: Get next player in rotation
 * For tag team, we maintain a team of players and rotate through them
 */
export interface TagTeamState {
  teamX: string[]; // Array of player IDs
  teamO: string[];
  currentXIndex: number;
  currentOIndex: number;
}

export function getNextTagTeamPlayer(
  state: TagTeamState,
  team: 'X' | 'O'
): { playerId: string; newState: TagTeamState } {
  const newState = { ...state };
  
  if (team === 'X') {
    const playerId = state.teamX[state.currentXIndex];
    newState.currentXIndex = (state.currentXIndex + 1) % state.teamX.length;
    return { playerId, newState };
  } else {
    const playerId = state.teamO[state.currentOIndex];
    newState.currentOIndex = (state.currentOIndex + 1) % state.teamO.length;
    return { playerId, newState };
  }
}
