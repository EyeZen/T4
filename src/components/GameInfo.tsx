import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import PlayerTurn from './PlayerTurn';
import Settings from './Settings';
import RulesPopup from './RulesPopup';
import { Info } from 'lucide-react';

const GameInfo: React.FC = () => {
  const { winner, resetGame } = useGame();
  const [showSettings, setShowSettings] = useState(false);
  const [showRules, setShowRules] = useState(true);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <PlayerTurn />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRules(true)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded"
            title="Game Rules"
          >
            <Info className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-500 hover:text-gray-700 p-1 rounded"
          >
            {showSettings ? 'Hide Settings' : 'Settings'}
          </button>
        </div>
      </div>

      {showRules && <RulesPopup onClose={() => setShowRules(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}

      <div className="h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-red-100 my-4 shadow-sm" />

      {winner && (
        <>
          <div className="h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-red-100 my-4 shadow-sm" />
      <div className="text-center">
            <div className={`
              p-3 mb-3 rounded-lg font-medium text-lg
              ${winner === 'X' ? 'bg-blue-100 text-blue-800' : 
                winner === 'O' ? 'bg-red-100 text-red-800' : 
                'bg-gray-100 text-gray-800'}
            `}>
              {winner === 'draw' ? "It's a draw!" : `Player ${winner} wins!`}
            </div>
            <button
              onClick={resetGame}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg 
                         hover:bg-indigo-700 transition-colors duration-200"
            >
              Play Again
            </button>
          </div>
          <p className="mt-4 text-gray-600 text-sm text-center">
            Oldest moves disappear after the timer runs out. Be quick to win!
          </p>
        </>
      )}
    </div>
  );
};

export default GameInfo;