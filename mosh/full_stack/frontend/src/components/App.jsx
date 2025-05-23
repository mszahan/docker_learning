import React, { useState, useEffect } from "react";
import MovieForm from "./MovieForm";
import MovieList from "./MovieList";
import api from "../services/api";
import "./App.css";

function App() {
  const moviesEndpoint = "/movies";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await api.get(moviesEndpoint);
        setMovies(data);
      } catch (error) {
        setError("Could not fetch the movies!");
      }
    };

    fetchMovies();
  }, []);

  const handleAddMovie = async (title) => {
    try {
      const movie = { _id: Date.now(), title };
      setMovies([...movies, movie]);

      const { data: savedMovie } = await api.create(moviesEndpoint, movie);

      // Replace the optimistic movie with the saved one (with real _id if different)
      setMovies((prevMovies) =>
        prevMovies.map((m) => (m._id === movie._id ? savedMovie : m))
      );
    } catch (error) {
      setError("Could not save the movie!");
      setMovies((prevMovies) => prevMovies.filter((m) => m._id !== title._id));
    }
  };

  const handleDeleteMovie = async (movie) => {
    try {
      setMovies(movies.filter((m) => m._id !== movie._id));
      await api.remove(`${moviesEndpoint}/${movie._id}`);
    } catch (error) {
      setError("Could not delete the movie!");
      setMovies([...movies, movie]); // re-add the movie if deletion fails
    }
  };

  return (
    <div className="App">
      <MovieForm onAddMovie={handleAddMovie} />
      {error && (
        <p role="alert" className="Error">
          {error}
        </p>
      )}
      <MovieList movies={movies} onDeleteMovie={handleDeleteMovie} />
    </div>
  );
}

export default App;
