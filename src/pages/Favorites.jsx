import { Link, useOutletContext } from "react-router-dom";
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
                        className="btn btn-danger"
                        onClick={clearFavorites} // Clears entire favorites list
                    >
                        Clear All
                    </button>
                </div>
            )}

            {favorites.length === 0 ? (

                // Empty state UI when no favorites are added
                <div>
                    <div className="alert alert-info text-center">
                        No favorites yet ❤️
                    </div>

                    {/* Navigation back to home to add favorites */}
                    <button className="btn btn-outline-warning border-2 d-block mx-auto fs-5">
                        <Link
                            to="/"
                            className="text-decoration-none text-dark"
                        >
                            Add Favorites ❤️
                        </Link>
                    </button>
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