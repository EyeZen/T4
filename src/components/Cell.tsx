import React, { useState, useEffect } from 'react';
import { X, Circle } from 'lucide-react';
import { Player } from '../context/GameContext';

interface CellProps {
  value: Player | null;
  isWinningCell: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, isWinningCell, onClick }) => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (value) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <button
      onClick={onClick}
      className={`
        aspect-square flex items-center justify-center
        text-4xl font-bold bg-white rounded-lg
        transition-all duration-200 shadow-sm
        ${animate ? 'pop-in' : ''}
        ${isWinningCell ? 'winner-cell' : 'hover:bg-gray-50'}
        ${value === null ? 'cursor-pointer' : 'cursor-default'}
      `}
      disabled={value !== null}
    >
      {value === 'X' && (
        <X 
          className={`cell-x w-10 h-10 ${isWinningCell ? 'pulse' : ''}`} 
          strokeWidth={3} 
        />
      )}
      {value === 'O' && (
        <Circle 
          className={`cell-o w-10 h-10 ${isWinningCell ? 'pulse' : ''}`} 
          strokeWidth={3} 
        />
      )}
    </button>
  );
};

export default Cell;