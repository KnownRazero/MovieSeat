import { useState, useEffect } from "react";
import moviesData from "/Json/movies.json";

function MovieContainer({ onMovieChange, onPriceChange }) {
    const handleMovieChange = (e) => {
        const title = e.target.value;

        if (title === "") {
            onMovieChange(null);
            onPriceChange(0);
            return;
        }

        const movie = moviesData.find(m => m.Title === title) || null;

        onMovieChange(movie);
        onPriceChange(movie ? movie.Price : 0);
    };

    return (
        <div className="movie-container">
            <label htmlFor="movie">Pick a movie:</label>
            <select name="movie" id="movie" onChange={handleMovieChange}>
                <option value="0">Select a movie</option>
                {moviesData.map(movie => (
                    <option key={movie.Title} value={movie.Title}
                    > {movie.Title} ({movie.Price} kr)
                    </option>
                ))}
            </select>
        </div>
    )
}

export default MovieContainer;