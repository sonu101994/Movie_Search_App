import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Card from "../components/Card";
import { searchMoviesApiURL, topMoviesApiURL } from "../services/api";

export default function Home() {

  // Shared state from layout (global app state)
  const {
    favorites,
    toggleFavorite,
    search,
    page,
    setPage,
    setSearch
  } = useOutletContext();

  // Local state for API data and loading indicator
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch movies based on current search or page
  async function getMovies() {
    setLoading(true);

    // Decide endpoint: search vs popular movies
    const url = search
      ? searchMoviesApiURL(search)
      : topMoviesApiURL(page);

    const res = await fetch(url);
    const data = await res.json();

    // Ensure safe fallback if API returns undefined
    setMovies(data.results || []);
    setLoading(false);
  }

  // Re-fetch data whenever search query or page changes
  useEffect(() => {
    getMovies();
  }, [search, page]);

  function handleBack() {
    setSearch(""); // Reset search → switches UI back to popular movies
  }

  // Dynamic heading based on current state
  const headingText = search
    ? `Search results for "${search}"`
    : "Popular Movies";

  return (
    <div className="container py-3">

      {/* Loading state while fetching API data */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-warning"></div>
        </div>
      )}

      {/* Empty state when no results are returned */}
      {!loading && movies.length === 0 && (
        <div className="alert alert-info text-center">
          No movies found 😢
        </div>
      )}

      {/* Main content rendered only when data is available */}
      {!loading && movies.length > 0 && (
        <>
          
          {/* Header: shows context (search or popular) + controls */}
          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="bg-warning px-2 py-1 rounded d-none d-sm-block">
              {headingText}
            </h5>

            {/* Show page info in browsing mode, back button in search mode */}
            {!search ? (
              <span className="badge bg-secondary ">
                Page - {page}
              </span>
            ) : (
              <button className="btn btn-sm btn-dark" onClick={handleBack} >
                ← Back
              </button>
            )}

          </div>

          {/* Movie list rendered via reusable Card component */}
          <div className="row g-4">
            <Card
              movies={movies}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>

          {/* Pagination controls only for non-search mode */}
          {!search && (
            <div className="d-flex justify-content-center gap-3 mt-4">

              <button
                className="btn btn-outline-secondary"
                onClick={() => setPage(p => Math.max(p - 1, 1))} // Prevent page < 1
              >
                ⬅ Prev
              </button>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setPage(p => p + 1)}
              >
                Next ➡
              </button>

            </div>
          )}

        </>
      )}

    </div>
  );
}