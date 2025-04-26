import React from 'react';
import { X, Circle } from 'lucide-react';
import { useGame } from '../context/GameContext';

const PlayerTurn: React.FC = () => {
  const { currentPlayer, winner } = useGame();
  
  if (winner) return null;

  return (
    <div className="flex items-center">
      <span className="mr-2 text-gray-700">Current turn:</span>
      <div className={`
        flex items-center justify-center p-2 rounded-md
        ${currentPlayer === 'X' ? 'bg-blue-100' : 'bg-red-100'}
        transition-all duration-300
      `}>
        {currentPlayer === 'X' ? (
          <X className="text-blue-500 w-6 h-6" />
        ) : (
          <Circle className="text-red-500 w-6 h-6" />
        )}
      </div>
    </div>
  );
};

export default PlayerTurn;