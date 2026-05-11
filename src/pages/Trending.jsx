import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import { trendingMoviesUrl } from "../services/api";

export default function Trending() {

//  extracting functions from context
  // favorites → list of saved movies
  // toggleFavorite → function to add/remove from favorites
  const { favorites, toggleFavorite } = useOutletContext();

  // creating state to store fetched trending movies
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(trendingMoviesUrl)
      .then(res => res.json())
      .then(data => {
        // storing result in movies state if fallback empty array will be stored
        setMovies(data.results || []);
      })
      .catch(err => {
      
        console.error("Error fetching trending movies:", err);
      });

    // Empty dependency array → runs only once on component mount
  }, []);

  return (
    <div className="container py-3">

      {/* Grid layout for movie cards */}
      <div className="row g-4">
        {/* card component for render in UI */}
        <Card
          movies={movies}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
        />

      </div>
    </div>
  );
}