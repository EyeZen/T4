import React from 'react';

interface RulesPopupProps {
  onClose: () => void;
}

const RulesPopup: React.FC<RulesPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Game Rules</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
          <li>The game is played on a 3x3 grid.</li>
          <li>Players take turns placing their mark (X or O) on an empty tile.</li>
          <li>The first player to align three marks in a row, column, or diagonal wins.</li>
          <li>If all tiles are filled and no player has aligned three marks, the game ends in a draw.</li>
          <li>Each move has a time limit. If a player doesn't make a move within the time limit, their oldest move disappears.</li>
          <li>
            If a player doesn't make a move within twice the tile expiration time, the other player wins by default.
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RulesPopup;