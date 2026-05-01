import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import { trendingMoviesUrl } from "../services/api";

export default function Trending() {

  // Access shared state from parent layout (React Router Outlet Context)
  // favorites → list of saved movies
  // toggleFavorite → function to add/remove from favorites
  const { favorites, toggleFavorite } = useOutletContext();

  // Local state to store fetched trending movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(trendingMoviesUrl)
      .then(res => res.json())
      .then(data => {
        // Safely update state with results (fallback to empty array if undefined)
        setMovies(data.results || []);
      })
      .catch(err => {
        // Basic error handling (can be improved with UI feedback)
        console.error("Error fetching trending movies:", err);
      });

    // Empty dependency array → runs only once on component mount
  }, []);

  return (
    <div className="container py-3">

      {/* Grid layout for movie cards */}
      <div className="row g-4">

        {/* 
          Card component is responsible for rendering movie UI.
          Passing:
          - movies → list of trending movies
          - favorites → current favorite movies
          - toggleFavorite → handler for adding/removing favorites
        */}
        <Card
          movies={movies}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

      </div>
    </div>
  );
}