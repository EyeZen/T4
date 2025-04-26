import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { checkWinner } from '../utils/gameUtils';

export type Player = 'X' | 'O';

interface Move {
  position: number;
  player: Player;
  timestamp: number;
}

interface GameContextType {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  winningCombination: number[] | null;
  moves: Move[];
  moveTimeLimit: number;
  makeMove: (position: number) => void;
  resetGame: () => void;
  setMoveTimeLimit: (seconds: number) => void;
}

const DEFAULT_MOVE_TIME_LIMIT = 10; // seconds

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<(Player | null)[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);
  const [winningCombination, setWinningCombination] = useState<number[] | null>(null);
  const [moves, setMoves] = useState<Move[]>([]);
  const [moveTimeLimit, setMoveTimeLimit] = useState<number>(DEFAULT_MOVE_TIME_LIMIT);

  // Check for winner or draw
  const checkGameStatus = useCallback((newBoard: (Player | null)[]) => {
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningCombination(result.combination);
      return true;
    }
    
    // Check for draw (all cells filled)
    if (newBoard.every(cell => cell !== null)) {
      setWinner('draw');
      return true;
    }
    
    return false;
  }, []);

  // Remove oldest move for a player
  const removeOldestMove = useCallback((player: Player) => {
    // Filter moves for the current player
    const playerMoves = moves.filter(move => move.player === player);
    
    if (playerMoves.length === 0) return;
    
    // Find the oldest move
    const oldestMove = playerMoves.reduce((oldest, move) => 
      move.timestamp < oldest.timestamp ? move : oldest, playerMoves[0]);
    
    // Create a new board without the oldest move
    const newBoard = [...board];
    newBoard[oldestMove.position] = null;
    
    // Update the moves list
    const newMoves = moves.filter(move => 
      !(move.position === oldestMove.position && move.player === oldestMove.player));
    
    setBoard(newBoard);
    setMoves(newMoves);
    
    // Check if this changes the game status
    checkGameStatus(newBoard);
  }, [board, moves, checkGameStatus]);

  // Handle expiring moves
  useEffect(() => {
    if (winner || moves.length === 0) return;

    const timers: NodeJS.Timeout[] = [];
    
    // For each move, set a timer to remove it after the time limit
    moves.forEach(move => {
      const expirationTime = move.timestamp + moveTimeLimit * 1000;
      const timeRemaining = expirationTime - Date.now();
      
      if (timeRemaining > 0) {
        const timer = setTimeout(() => {
          removeOldestMove(move.player);
        }, timeRemaining);
        
        timers.push(timer);
      }
    });
    
    // Cleanup timers on unmount or when moves change
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [moves, moveTimeLimit, winner, removeOldestMove]);

  // Make a move
  const makeMove = (position: number) => {
    if (board[position] !== null || winner) return;
    
    const newBoard = [...board];
    newBoard[position] = currentPlayer;
    
    const newMove: Move = {
      position,
      player: currentPlayer,
      timestamp: Date.now()
    };
    
    const newMoves = [...moves, newMove];
    
    setBoard(newBoard);
    setMoves(newMoves);
    
    // Check if game is over
    const gameOver = checkGameStatus(newBoard);
    
    if (!gameOver) {
      // Switch players
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningCombination(null);
    setMoves([]);
  };

  const value = {
    board,
    currentPlayer,
    winner,
    winningCombination,
    moves,
    moveTimeLimit,
    makeMove,
    resetGame,
    setMoveTimeLimit
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};