import { Link, useLocation } from "react-router-dom";
import Input from "./Input";
import { useMemo } from "react";

// Header component for the movie search app, handling navigation and search functionality
export default function Header({
    search,
    setSearch,
    onSearch,
    heading ,
}) {
    const { pathname } = useLocation();

    // Memoized route checks to avoid recalculating on every render
    const hideSearch = useMemo(
        () => ["/trending", "/favorites"].includes(pathname),
        [pathname]
    );

    // Navigation links configuration
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/trending", label: "Trending" },
        { path: "/favorites", label: "Favorites" },
    ];

    return (
        <header
            className="position-sticky top-0 bg-white shadow-sm"
            style={{ zIndex: 1000 }}
        >
            <div className="container-fluid px-4 py-2">

                {/* Top Section with heading and navigation */}
                <div className={`d-flex justify-content-between align-items-center ${hideSearch ? "py-2" : ""}`}>

                    {/* Logo / Heading */}
                    <h4 className="text-warning m-0 d-none d-md-block fw-bold">
                        {heading}
                    </h4>

                    {/* Navigation */}
                    <nav className="d-flex gap-4">
                        {navLinks.map(({ path, label }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`text-decoration-none fw-medium transition ${
                                    pathname === path
                                        ? "text-warning border-bottom border-warning"
                                        : "text-dark"
                                }`}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Search Section - only shown on home page */}
                {!hideSearch && (
                    <div className="row g-2 mt-2 align-items-center">

                        <div className="col-12 col-md-10">
                            <Input
                                value={search}
                                setValue={setSearch}
                                onSearch={onSearch}
                                placeholder="Search movies..."
                            />
                        </div>

                        <div className="col-12 col-md-2">
                            <button
                                className="btn btn-warning w-100 fw-semibold"
                                onClick={onSearch}
                                aria-label="Search movies"
                            >
                                Search
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </header>
    );
}