import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import { useGame } from '../context/GameContext';
import WinningLine from './WinningLine';

const Board: React.FC = () => {
  const { board, makeMove, winningCombination, winner } = useGame();
  const [showGameOver, setShowGameOver] = useState(false);

  useEffect(() => {
    if (winner) {
      // Show game over message after 2.5 seconds
      const timer = setTimeout(() => {
        setShowGameOver(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setShowGameOver(false);
    }
  }, [winner]);

  if (showGameOver) {
    return (
      <div className="mt-6 game-over">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl shadow-inner text-center">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            GAME OVER
          </h2>
          <p className="text-xl text-gray-700">
            {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xs mx-auto bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl shadow-inner relative">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            isWinningCell={winningCombination?.includes(index) || false}
            onClick={() => makeMove(index)}
          />
        ))}
        {winningCombination && <WinningLine combination={winningCombination} />}
      </div>
    </div>
  );
};

export default Board;