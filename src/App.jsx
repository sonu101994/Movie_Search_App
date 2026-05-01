import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import MovieDetail from "./pages/MovieDetail";
import Trending from "./pages/Trending";

export default function App() {

  // Manage the list of favorite movies and initialize from localStorage.
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("fav");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favorites to localStorage whenever the list changes.
  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle a movie in the favorites list: add it if missing, remove it if present.
  function toggleFavorite(movie) {
    const exists = favorites.find(f => f.id === movie.id);

    if (exists) {
      setFavorites(favorites.filter(f => f.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  // Clear all favorites and remove the saved data from localStorage.
  function clearFavorites() {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Remove all favorites?</p>
          <button
            onClick={() => {
              setFavorites([]);
              localStorage.removeItem("fav");
              toast.success("Favorites cleared!");
              closeToast();
            }}
          >
            Yes
          </button>

          <button onClick={closeToast} style={{ marginLeft: "10px" }}>
            No
          </button>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  }

  // Define app routes and attach the shared layout component.
  // The Layout component receives favorites state and the toggle action.
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout favorites={favorites} toggleFavorite={toggleFavorite} />,
      children: [
        { index: true, element: <Home /> },
        { path: "trending", element: <Trending /> },
        { path: "favorites", element: <Favorites clearFavorites={clearFavorites} /> },
        { path: "movie/:id", element: <MovieDetail /> }
      ]
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}