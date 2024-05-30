import React from 'react';

function Square({ value, onClick, isWinningSquare }) {
  return (
    <div>
      <button
        className={`square ${isWinningSquare ? 'winning' : ''}`}
        onClick={onClick}>
        {value}
      </button>
    </div>
  )
}

export default Square
