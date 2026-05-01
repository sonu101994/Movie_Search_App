import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";

export default function Layout({ favorites, toggleFavorite }) {

  // Provides current route info for conditional UI logic
  const location = useLocation();

  // Shared state for search and pagination across pages
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Hide header on movie detail pages (e.g., /movie/:id)
  const hideHeader = location.pathname.startsWith("/movie");

  // Dynamic heading based on current route
  let heading = "🎬 Movie Parlour";

  if (location.pathname === "/trending") heading = "🔥 Trending Movies";
  if (location.pathname === "/favorites") heading = "❤️ Favorite Movies";

  function handleSearch() {
    setPage(1); // Reset pagination when a new search is triggered
  }

  function clearSearch() {
    setSearch("");
    setPage(1); // Ensure UI resets to initial state
  }

  return (
    <div className="bg-light min-vh-100">

      {/* Conditionally render header based on route */}
      {!hideHeader && (
        <Header
          heading={heading}
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
        />
      )}

      {/* 
        Outlet passes shared state to nested routes:
        - favorites management
        - search & pagination control
      */}
      <Outlet
        context={{
          favorites,
          toggleFavorite,
          search,
          setSearch,
          page,
          setPage,
          clearSearch
        }}
      />

    </div>
  );
}