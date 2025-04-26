import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

const MoveTimers: React.FC = () => {
  const { moves, moveTimeLimit, currentPlayer, winner } = useGame();
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});

  useEffect(() => {
    if (winner) return;

    // Initialize time left for each move
    const initialTimeLeft: Record<string, number> = {};
    moves.forEach((move) => {
      const expirationTime = move.timestamp + moveTimeLimit * 1000;
      const remaining = Math.max(0, Math.floor((expirationTime - Date.now()) / 1000));
      initialTimeLeft[`${move.player}-${move.position}`] = remaining;
    });
    setTimeLeft(initialTimeLeft);

    // Update time left every second
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const updated: Record<string, number> = {};
        Object.keys(prev).forEach(key => {
          updated[key] = Math.max(0, prev[key] - 1);
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [moves, moveTimeLimit, winner]);

  // Group moves by player
  const xMoves = moves.filter(move => move.player === 'X');
  const oMoves = moves.filter(move => move.player === 'O');

  if (xMoves.length === 0 && oMoves.length === 0) return null;
  if (winner) return null;

  return (
    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className={`p-4 rounded-lg border-2 shadow-sm ${currentPlayer === 'X' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="text-sm font-medium text-blue-800 mb-2">Player X Moves</h3>
        {xMoves.length > 0 ? (
          <ul className="space-y-2">
            {xMoves.map((move) => {
              const key = `X-${move.position}`;
              const timeRemaining = timeLeft[key] || 0;
              const isExpiring = timeRemaining <= 3;
              
              return (
                <li 
                  key={key}
                  className={`text-xs flex justify-between p-1.5 rounded ${isExpiring ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-600'}`}
                >
                  <span>Position {move.position + 1}</span>
                  <span>{timeRemaining}s</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No moves yet</p>
        )}
      </div>
      
      <div className={`p-4 rounded-lg border-2 shadow-sm ${currentPlayer === 'O' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="text-sm font-medium text-red-800 mb-2">Player O Moves</h3>
        {oMoves.length > 0 ? (
          <ul className="space-y-2">
            {oMoves.map((move) => {
              const key = `O-${move.position}`;
              const timeRemaining = timeLeft[key] || 0;
              const isExpiring = timeRemaining <= 3;
              
              return (
                <li 
                  key={key}
                  className={`text-xs flex justify-between p-1.5 rounded ${isExpiring ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-600'}`}
                >
                  <span>Position {move.position + 1}</span>
                  <span>{timeRemaining}s</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No moves yet</p>
        )}
      </div>
    </div>
  );
};

export default MoveTimers;