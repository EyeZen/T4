import React from 'react';
import MoveTimers from './MoveTimers';

const SidePanel: React.FC = () => {
  return (
    <div className="w-full md:w-64 p-4 bg-gray-100 border-t md:border-t-0 md:border-l border-gray-300 shadow-md">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Move Timers</h2>
      <MoveTimers />
    </div>
  );
};

export default SidePanel;