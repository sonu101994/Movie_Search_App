import { Link, useOutletContext } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import Card from "../components/Card";

export default function Favorites({ clearFavorites }) {

    // Access shared favorites state and toggle handler from parent layout
    const { favorites, toggleFavorite } = useOutletContext();

    return (
        <div className="container py-3">

            {/* Show "Clear All" only when favorites exist */}
            {favorites.length > 0 && (
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-danger d-flex align-items-center gap-2"
                        onClick={clearFavorites} // Clears entire favorites list
                    >
                        <FaTrash />
                        <span>Clear All</span>
                    </button>
                </div>
            )}

            {favorites.length === 0 ? (

                // Empty state UI when no favorites are added
                <div>
                    <div className="alert alert-info text-center d-flex align-items-center justify-content-center gap-2">
                        <span>No favorites yet</span>
                        <FaRegHeart />
                    </div>

                    {/* Navigation back to home to add favorites */}
                    <Link
                        to="/"
                        className="btn btn-outline-warning border-2 d-flex align-items-center justify-content-center gap-2 mx-auto fs-5 text-dark text-decoration-none"
                        style={{ maxWidth: "220px" }}
                    >
                        <span>Add Favorites</span>
                        <FaHeart />
                    </Link>
                </div>

            ) : (

                // Render favorite movies using reusable Card component
                <div className="row g-4">
                    <Card
                        movies={favorites}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                    />
                </div>

            )}

        </div>
    );
}
