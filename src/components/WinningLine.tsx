import React from 'react';

interface WinningLineProps {
  combination: number[];
}

const WinningLine: React.FC<WinningLineProps> = ({ combination }) => {
  const getLineStyles = () => {
    const cellSize = 100 / 3; // percentage
    const positions = {
      // Horizontal lines
      '0,1,2': {
        top: `${cellSize / 2}%`,
        left: '0',
        className: 'winning-line winning-line-horizontal'
      },
      '3,4,5': {
        top: `${cellSize * 1.5}%`,
        left: '0',
        className: 'winning-line winning-line-horizontal'
      },
      '6,7,8': {
        top: `${cellSize * 2.5}%`,
        left: '0',
        className: 'winning-line winning-line-horizontal'
      },
      // Vertical lines
      '0,3,6': {
        top: '0',
        left: `${cellSize / 2}%`,
        className: 'winning-line winning-line-vertical'
      },
      '1,4,7': {
        top: '0',
        left: `${cellSize * 1.5}%`,
        className: 'winning-line winning-line-vertical'
      },
      '2,5,8': {
        top: '0',
        left: `${cellSize * 2.5}%`,
        className: 'winning-line winning-line-vertical'
      },
      // Diagonal lines
      '0,4,8': {
        top: '50%',
        left: '50%',
        className: 'winning-line winning-line-diagonal'
      },
      '2,4,6': {
        top: '50%',
        left: '50%',
        className: 'winning-line winning-line-diagonal-reverse'
      }
    };

    return positions[combination.join(',')] || {};
  };

  const { className, ...styles } = getLineStyles();

  return <div className={className} style={styles} />;
};

export default WinningLine;