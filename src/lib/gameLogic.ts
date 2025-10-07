// Game Logic Implementation

import { Player, SmallBoard, UTTTBoard, STTTBoard, HTTTBoard, GameMode } from '@/types/game';

/**
 * Check if a small 3x3 board has a winner
 */
export function checkSmallBoardWinner(cells: Player[]): Player | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }

  return null;
}

/**
 * Check if a board is full (draw)
 */
export function isBoardFull(cells: Player[]): boolean {
  return cells.every(cell => cell !== null);
}

/**
 * Create an empty small board
 */
export function createSmallBoard(): SmallBoard {
  return {
    cells: Array(9).fill(null),
    winner: null,
  };
}

/**
 * Create an empty UTTT board
 */
export function createUTTTBoard(): UTTTBoard {
  return {
    boards: Array(9).fill(null).map(() => createSmallBoard()),
    mainWinner: null,
  };
}

/**
 * Create an empty STTT board
 */
export function createSTTTBoard(): STTTBoard {
  return {
    boards: Array(9).fill(null).map(() => createUTTTBoard()),
    mainWinner: null,
  };
}

/**
 * Create an empty HTTT board
 */
export function createHTTTBoard(): HTTTBoard {
  return {
    boards: Array(9).fill(null).map(() => createSTTTBoard()),
    mainWinner: null,
  };
}

/**
 * Make a move on UTTT board
 * @param board - The UTTT board
 * @param boardIndex - Index of the small board (0-8)
 * @param cellIndex - Index of the cell within the small board (0-8)
 * @param player - The player making the move
 * @returns Updated board and next valid boards
 */
export function makeUTTTMove(
  board: UTTTBoard,
  boardIndex: number,
  cellIndex: number,
  player: Player
): { board: UTTTBoard; nextValidBoards: number[] | null } {
  const newBoard = JSON.parse(JSON.stringify(board)) as UTTTBoard;
  
  // Make the move
  newBoard.boards[boardIndex].cells[cellIndex] = player;
  
  // Check if this small board now has a winner
  const smallBoardWinner = checkSmallBoardWinner(newBoard.boards[boardIndex].cells);
  if (smallBoardWinner) {
    newBoard.boards[boardIndex].winner = smallBoardWinner;
  }
  
  // Check if the main board has a winner
  const mainWinners = newBoard.boards.map(b => b.winner);
  const mainWinner = checkSmallBoardWinner(mainWinners);
  if (mainWinner) {
    newBoard.mainWinner = mainWinner;
  }
  
  // Determine next valid boards (UTTT rule: play in board corresponding to cell index)
  const nextBoard = newBoard.boards[cellIndex];
  let nextValidBoards: number[] | null;
  
  if (nextBoard.winner !== null || isBoardFull(nextBoard.cells)) {
    // If the designated board is won or full, player can play anywhere
    nextValidBoards = null;
  } else {
    nextValidBoards = [cellIndex];
  }
  
  return { board: newBoard, nextValidBoards };
}

/**
 * Make a move on STTT board
 * Position: [boardIndex, subBoardIndex, cellIndex]
 */
export function makeSTTTMove(
  board: STTTBoard,
  position: [number, number, number],
  player: Player
): { board: STTTBoard; nextValidBoards: number[] | null } {
  const [boardIndex, subBoardIndex, cellIndex] = position;
  const newBoard = JSON.parse(JSON.stringify(board)) as STTTBoard;
  
  // Make move on the UTTT board
  const { board: updatedUTTT, nextValidBoards: subNext } = makeUTTTMove(
    newBoard.boards[boardIndex],
    subBoardIndex,
    cellIndex,
    player
  );
  
  newBoard.boards[boardIndex] = updatedUTTT;
  
  // Check if main STTT board has a winner
  const mainWinners = newBoard.boards.map(b => b.mainWinner);
  const mainWinner = checkSmallBoardWinner(mainWinners);
  if (mainWinner) {
    newBoard.mainWinner = mainWinner;
  }
  
  // For STTT: next position is (subBoardIndex, cellIndex, ?)
  // The next board is determined by cellIndex from the UTTT rules
  return { board: newBoard, nextValidBoards: subNext };
}

/**
 * Make a move on HTTT board
 * Position: [boardIndex, subBoardIndex, subSubBoardIndex, cellIndex]
 */
export function makeHTTTMove(
  board: HTTTBoard,
  position: [number, number, number, number],
  player: Player
): { board: HTTTBoard; nextValidBoards: number[] | null } {
  const [boardIndex, subBoardIndex, subSubBoardIndex, cellIndex] = position;
  const newBoard = JSON.parse(JSON.stringify(board)) as HTTTBoard;
  
  // Make move on the STTT board
  const { board: updatedSTTT, nextValidBoards: subNext } = makeSTTTMove(
    newBoard.boards[boardIndex],
    [subBoardIndex, subSubBoardIndex, cellIndex],
    player
  );
  
  newBoard.boards[boardIndex] = updatedSTTT;
  
  // Check if main HTTT board has a winner
  const mainWinners = newBoard.boards.map(b => b.mainWinner);
  const mainWinner = checkSmallBoardWinner(mainWinners);
  if (mainWinner) {
    newBoard.mainWinner = mainWinner;
  }
  
  return { board: newBoard, nextValidBoards: subNext };
}

/**
 * Validate if a move is legal
 */
export function isValidMove(
  mode: GameMode,
  board: any,
  position: number[],
  nextValidBoards: number[] | null
): boolean {
  if (mode === 'UTTT') {
    const [boardIndex, cellIndex] = position;
    const utttBoard = board as UTTTBoard;
    
    // Check if cell is empty
    if (utttBoard.boards[boardIndex].cells[cellIndex] !== null) {
      return false;
    }
    
    // Check if board is valid to play on
    if (nextValidBoards !== null && !nextValidBoards.includes(boardIndex)) {
      return false;
    }
    
    // Check if small board is already won
    if (utttBoard.boards[boardIndex].winner !== null) {
      return false;
    }
    
    return true;
  }
  
  // Similar logic for STTT and HTTT
  return true;
}

/**
 * Get position from move index for UTTT
 */
export function getPositionFromIndex(index: number, mode: GameMode): number[] {
  if (mode === 'UTTT') {
    const boardIndex = Math.floor(index / 9);
    const cellIndex = index % 9;
    return [boardIndex, cellIndex];
  }
  
  // For STTT and HTTT, more complex indexing needed
  return [];
}

/**
 * Calculate rating change using Elo system
 */
export function calculateRatingChange(
  playerRating: number,
  opponentRating: number,
  result: number, // 1 for win, 0.5 for draw, 0 for loss
  kFactor: number = 32
): number {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  return Math.round(kFactor * (result - expectedScore));
}
