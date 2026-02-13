import { useState } from 'react';

function Container({ seats, selectedSeats, onSeatsChange, occupiedSeats, selectedPrice }) {

  const handleSeatClick = (rowIdx, seatIdx) => {
    if (selectedPrice === 0) return;
    if (occupiedSeats[rowIdx][seatIdx]) return;

    const updated = selectedSeats.map(r => [...r]);
    updated[rowIdx][seatIdx] = !updated[rowIdx][seatIdx];
    onSeatsChange(updated);
  };

  return (
    <div className="container">
      <div className="screen"></div>
      {seats.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((_, seatIdx) => (
            <div
              key={seatIdx}
              className={`seat ${occupiedSeats[rowIdx][seatIdx] ? 'occupied' : ''} 
              ${selectedSeats[rowIdx][seatIdx] ? 'selected' : ''}`}
              onClick={() => handleSeatClick(rowIdx, seatIdx)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Container;