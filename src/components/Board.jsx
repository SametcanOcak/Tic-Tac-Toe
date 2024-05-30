import React, { useState } from 'react';
import Square from "./Square.jsx";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isGameover, setIsGameOver] = useState(false);

  const handleClick = (index) => {
    if (isGameover) return;

    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[index]) {
      return;
    }
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setIsGameOver(false);
  };

  const renderSquare = (index) => {
    const winnerInfo = calculateWinner(squares);
    const isWinningSquare = winnerInfo && winnerInfo.includes(index);
    return (
      <Square
        value={squares[index]}
        onClick={() => handleClick(index)}
        isWinningSquare={isWinningSquare}
      />
    );
  };

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = `Tebrikler! Kazanan: ${winnerInfo}`;
    setTimeout(() => setIsGameOver(true), 100);
  } else if (squares.every(Boolean)) {
    status = "Berabere !";
    setTimeout(() => setIsGameOver(true), 100)
  } else {
    status = `Sıradaki oyuncu: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className='game'>
      <h1>Tic-Tac-Toe </h1>
      <div className='status'>{status}</div>
      <div className='board'>
        <div className='board-row'>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="restart-button" onClick={handleRestart}>Yeniden Başlat</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board
