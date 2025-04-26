import React from 'react';
import { X } from 'lucide-react';

interface RulesPopupProps {
  onClose: () => void;
}

const RulesPopup: React.FC<RulesPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Rules</h2>
        
        <div className="space-y-3 text-gray-600">
          <p>Welcome to Timed Tic Tac Toe! This game adds an exciting twist to the classic game:</p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>Players take turns placing X's and O's on the board</li>
            <li>Each move has a timer - when it expires, that move disappears!</li>
            <li>The oldest move of each player will disappear when its timer runs out</li>
            <li>Win by getting three in a row before your moves expire</li>
            <li>You can adjust the move timer duration in Settings</li>
          </ul>

          <p className="font-medium text-gray-700 mt-4">
            Strategy Tip: Keep track of your move timers and plan accordingly!
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg 
                     hover:bg-indigo-700 transition-colors duration-200"
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default RulesPopup;