import { useMemo, useState, useEffect } from 'react';
import MovieContainer from './components/MovieContainer';
import Showcase from './components/Showcase';
import Container from './components/Container';
import Text from './components/Text';
import BuyButton from './components/BuyButton';

function makeEmptySelectionFrom(seatGrid) {
  return seatGrid.map(row => row.map(() => false));
}

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (!selectedMovie) {
      setSelectedPrice(0);
      setOccupiedSeats([]);
      setSelectedSeats([]);
      return;
    }

    setSelectedPrice(selectedMovie.Price);
    setOccupiedSeats(selectedMovie.seats);
    setSelectedSeats(makeEmptySelectionFrom(selectedMovie.seats));
  }, [selectedMovie]);

  const seatCount = useMemo(() => selectedSeats.flat()
  .filter(Boolean).length, [selectedSeats]
  );
  
  const totalPrice = seatCount * selectedPrice;

  const handleBuy = () => {
    if (!selectedMovie) return;
    if (seatCount === 0) return;
    
    const updatedoccupied = occupiedSeats.map((row, r) => 
      row.map((isOccupied, s) => isOccupied || selectedSeats[r][s])
    );
    
    setOccupiedSeats(updatedoccupied);

    setSelectedSeats(makeEmptySelectionFrom(selectedMovie.seats));
  };

  return (
    <>
    <MovieContainer onMovieChange={setSelectedMovie} onPriceChange={setSelectedPrice}></MovieContainer>
    <Showcase></Showcase>
    {selectedMovie ? (<Container seats={occupiedSeats} selectedSeats={selectedSeats}
    onSeatsChange={setSelectedSeats} occupiedSeats={occupiedSeats} selectedPrice={selectedPrice}/>) :
    (<p className="text">Please select a movie to see available seats.</p>)}
    <Text count={seatCount} total={totalPrice}></Text>
    <BuyButton onBuy={handleBuy}></BuyButton>
    </>
  );
}

export default App;