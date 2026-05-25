import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartLine,
  FaClock,
  FaFilm,
  FaImage,
  FaLanguage,
  FaStar,
  FaVoteYea,
} from "react-icons/fa";
import { movieDetailApiURL, movieVideosApiURL } from "../services/api";

export default function MovieDetail() {

  // Extract movie ID from route params
  const { id } = useParams();
  const navigate = useNavigate();

  // Local state for movie data, trailer, and loading state
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchMovieDetails() {
      setLoading(true);

      try {
        // Fetch movie details
        // Fetch related videos (trailers, teasers, etc.)
        const [movieRes, videosRes] = await Promise.all([
          fetch(movieDetailApiURL(id)),
          fetch(movieVideosApiURL(id)),
        ]);

        const movieData = await movieRes.json();
        const videosData = await videosRes.json();

        // data received from api stored in movie state
        setMovie(movieData?.success === false ? null : movieData);

        //  official YouTube trailer and in case fallback to any YouTube video
        const video =
          videosData.results?.find(v => v.type === "Trailer" && v.site === "YouTube") ||
          videosData.results?.find(v => v.site === "YouTube");

        setTrailer(video || null);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setMovie(null);
        setTrailer(null);
      } finally {
        setLoading(false); // Ensure loading stops after API calls
      }
    }

    fetchMovieDetails();
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
    return <p className="text-center mt-5">Movie not found</p>;
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-4">

      <div className="container">

        {/* Navigate back to previous page  */}
        <button
          className="btn btn-outline-light mb-3 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          <span>Back</span>
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
            <p className="text-warning d-flex align-items-center gap-2">
              <FaStar />
              <span>{movie.vote_average} / 10</span>
            </p>

            <p className="d-flex flex-wrap align-items-center gap-3">
              <span className="d-inline-flex align-items-center gap-2">
                <FaCalendarAlt />
                {movie.release_date || "N/A"}
              </span>
              <span className="d-inline-flex align-items-center gap-2">
                <FaLanguage />
                {movie.original_language?.toUpperCase() || "N/A"}
              </span>
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
            <p className="flex-grow-1">{movie.overview || "No overview available"}</p>

            {/* Additional stats */}
            <div className="mb-3 d-flex flex-wrap gap-2">
              <span className="badge bg-secondary d-inline-flex align-items-center gap-2">
                <FaVoteYea />
                Votes: {movie.vote_count}
              </span>

              <span className="badge bg-info text-dark d-inline-flex align-items-center gap-2">
                <FaClock />
                Runtime: {movie.runtime || "N/A"} min
              </span>

              <span className="badge bg-secondary d-inline-flex align-items-center gap-2">
                <FaChartLine />
                Popularity: {movie.popularity}
              </span>
            </div>

            <h4 className="pb-2 d-flex align-items-center gap-2">
              <FaFilm />
              <span>Trailer</span>
            </h4>

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
