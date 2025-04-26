import React, { useState } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { GameProvider } from './context/GameContext';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
            Timed Tic Tac Toe
          </h1>
        </div>
        <GameProvider>
          <div className="px-4 py-6 md:px-8 md:py-8">
            <GameInfo />
            <Board />
          </div>
        </GameProvider>
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        Oldest moves disappear after the timer runs out. Be quick to win!
      </p>
    </div>
  );
}

export default App;