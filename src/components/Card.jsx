import { useNavigate } from "react-router-dom";

import { FaImage } from "react-icons/fa";

// Card component displays a grid of movie cards with details and favorite functionality
export default function Card({ movies, favorites, toggleFavorite }) {

  // Hook for navigating to movie detail page
  const navigate = useNavigate();

  return (
    <>
      {/* Map through movies array and render a card for each movie */}
      {movies.map(movie => {

        // Check if current movie is in favorites list
        const isFav = favorites.some(f => f.id === movie.id);

        return (
          <div className=" col-sm-6 col-md-4 col-lg-3" key={movie.id}>

            {/* Clickable card container - navigates to movie detail on click */}
            <div
              className="card h-100"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >

              {/* Movie poster image */}

              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              ) : (
               <div
                className="w-100 rounded shadow d-flex justify-content-center align-items-center flex-column"
                style={{
                  aspectRatio: "2 / 3",
                  backgroundColor: "#2c2c2c"
                }}
              >
                  <p className="fs-3 text-white">Image Not Found</p>
                <FaImage size={80} color="#999" />
              </div>
              )}

              {/* Card body with movie info and action button */}
              <div className="card-body d-flex flex-column">

                {/* Movie title */}
                <h5>{movie.title}</h5>

                {/* Rating and favorite button section */}
                <div className="mt-auto d-flex justify-content-between">

                  {/* Movie rating display */}
                  <span>{movie.vote_average}/10</span>

                  {/* Favorite toggle button - filled if in favorites, outlined otherwise */}
                  <button
                    className={isFav ? "btn btn-warning" : "btn btn-outline-warning"}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(movie);
                    }}
                  >
                    ❤️
                  </button>

                </div>

              </div>

            </div>

          </div>
        );
      })}
    </>
  );
}