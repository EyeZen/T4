import React from 'react';
import { useGame } from '../context/GameContext';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { moveTimeLimit, setMoveTimeLimit, resetGame } = useGame();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 5 && value <= 30) {
      setMoveTimeLimit(value);
    }
  };

  const handleReset = () => {
    resetGame();
    onClose();
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-700 mb-2">Game Settings</h3>
      
      <div className="mb-3">
        <label className="block text-sm text-gray-600 mb-1">
          Move expiration time (seconds):
        </label>
        <input
          type="range"
          min="5"
          max="30"
          step="1"
          value={moveTimeLimit}
          onChange={handleTimeChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>5s</span>
          <span>{moveTimeLimit}s</span>
          <span>30s</span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={handleReset}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Reset Game
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Settings;