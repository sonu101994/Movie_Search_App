// API key loaded from environment variables (.env file)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Base URL for all TMDB API requests
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch popular movies (paginated)
 * @param {number} page - page number for pagination
 */
export const topMoviesApiURL = (page) =>
  `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=${page}`;

/**
 * Search movies by query
 * encodeURIComponent used to safely handle special characters in search
 * @param {string} query - search keyword
 */
export const searchMoviesApiURL = (query) =>
  `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

/**
 * Fetch detailed information for a specific movie
 * @param {number} id - movie ID
 */
export const movieDetailApiURL = (id) =>
  `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;

/**
 * Fetch trending movies (daily)
 */
export const trendingMoviesUrl =
  `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;