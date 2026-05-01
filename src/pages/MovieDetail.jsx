import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieDetailApiURL } from "../services/api";
import { FaImage } from "react-icons/fa";

export default function MovieDetail() {

  // Extract movie ID from route params
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state for movie data, trailer, and loading state
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    // Fetch movie details
    fetch(movieDetailApiURL(id))
      .then(res => res.json())
      .then(data => setMovie(data));

    // Fetch related videos (trailers, teasers, etc.)
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=04c35731a5ee918f014970082a0088b1`)
      .then(res => res.json())
      .then(data => {
        // Prefer official YouTube trailer; fallback to any YouTube video
        const video =
          data.results?.find(v => v.type === "Trailer" && v.site === "YouTube") ||
          data.results?.find(v => v.site === "YouTube");

        setTrailer(video);
      })
      .finally(() => setLoading(false)); // Ensure loading stops after API calls

  }, [id]); // Re-run when movie ID changes

  // Loading state UI
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-warning"></div>
      </div>
    );
  }

  // Fallback if movie data is unavailable
  if (!movie) {
    return <p className="text-center mt-5">Movie not found 😢</p>;
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-4">

      <div className="container">

        {/* Navigate back to previous page (history stack) */}
        <button
          className="btn btn-outline-light mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Responsive layout: poster (left) + details (right) */}
        <div className="row g-4 align-items-stretch">

          {/* Poster section */}
          <div className="col-12 col-md-4 d-flex">

            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-100 rounded shadow object-fit-cover"
                style={{ aspectRatio: "2 / 3" }}
              />
            ) : (
              <div
                className="w-100 rounded shadow d-flex justify-content-center align-items-center flex-column"
                style={{
                  aspectRatio: "2 / 3",
                  backgroundColor: "#2c2c2c"
                }}
              >
                  <p className="fs-3">Image Not Found</p>
                <FaImage size={80} color="#999" />
              </div>
            )}

          </div>

          {/* Details section */}
          <div className="col-12 col-md-8 d-flex flex-column">

            <h1 className="fw-bold">{movie.title}</h1>

            {/* Rating */}
            <p className="text-warning">⭐ {movie.vote_average} / 10</p>

            {/* Basic metadata */}
            <p>
              📅 {movie.release_date} | 🎬 {movie.original_language?.toUpperCase()}
            </p>

            {/* Genre tags */}
            <div className="mb-2">
              {movie.genres?.map(g => (
                <span key={g.id} className="badge bg-warning text-dark me-2">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Movie description */}
            <p className="flex-grow-1">{movie.overview}</p>

            {/* Additional stats */}
            <div className="mb-3">
              <span className="badge bg-secondary me-2">
                Votes: {movie.vote_count}
              </span>

              <span className="badge bg-info text-dark me-2">
                Runtime: {movie.runtime} min
              </span>

              <span className="badge bg-secondary">
                Popularity: {movie.popularity}
              </span>
            </div>

            <h4>🎬 Trailer</h4>

            {/* Embed YouTube trailer if available */}
            {trailer ? (
              <div className="ratio ratio-16x9 rounded overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                />
              </div>
            ) : (
              <p>No trailer available</p> // Fallback when no video exists
            )}

          </div>

        </div>

      </div>
    </div>
  );
}