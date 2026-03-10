import { useState, useEffect } from "react";

function MovieContainer({ onMovieChange, onPriceChange }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/movies.json")
            .then(res => res.json())
            .then(data => setMovies(data));
    }, []);

    const handleMovieChange = (e) => {
        const title = e.target.value;
        const movie = movies.find(m => m.Title === title);

        onMovieChange(movie);
        onPriceChange(movie ? movie.Price : 0);
    };

    return (
        <div className="movie-container">
            <label htmlFor="movie">Pick a movie:</label>
            <select name="movie" id="movie" onChange={handleMovieChange}>
                <option value="">Select a movie</option>
                {movies.map(movie => (
                    <option key={movie.Title} value={movie.Title}
                    > {movie.Title} ({movie.Price} kr)
                    </option>
                ))}
            </select>
        </div>
    )
}

export default MovieContainer;