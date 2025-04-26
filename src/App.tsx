import React from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import SidePanel from './components/SidePanel'; // Import the SidePanel
import { GameProvider, useGame } from './context/GameContext';
import './App.css';

const AppContent: React.FC = () => {
  const { showSidePanel } = useGame(); // Access `showSidePanel` from context

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start">
        {/* Main game container */}
        <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden w-full md:w-auto">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600">
            <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
              Timed Tic Tac Toe
            </h1>
          </div>
          <div className="px-4 py-6 md:px-8 md:py-8">
            <GameInfo />
            <Board />
          </div>
        </div>

        {/* Side panel */}
        {showSidePanel && (
          <div className="mt-4 md:mt-0 md:ml-4 w-full md:w-64">
            <SidePanel />
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;