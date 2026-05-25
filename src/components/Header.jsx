import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { FaFilm, FaFire, FaHeart, FaHome, FaSearch } from "react-icons/fa";
import Input from "./Input";

// Header component for the movie search app, handling navigation and search functionality
export default function Header({
    search,
    setSearch,
    onSearch,
    heading,
}) {
    const { pathname } = useLocation();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const updateMobileState = () => setIsMobile(mediaQuery.matches);

        updateMobileState();
        mediaQuery.addEventListener("change", updateMobileState);

        return () => mediaQuery.removeEventListener("change", updateMobileState);
    }, []);

    // Memoized route checks to avoid recalculating on every render
    const hideSearch = useMemo(
        () => ["/trending", "/favorites"].includes(pathname),
        [pathname]
    );

    // Navigation links configuration
    const navLinks = [
        { path: "/", label: "Home", icon: <FaHome /> },
        { path: "/trending", label: "Trending", icon: <FaFire /> },
        { path: "/favorites", label: "Favorites", icon: <FaHeart /> },
    ];

    function handleInputChange(value) {
        setSearch(value);

        if (isMobile || value.trim() === "") {
            onSearch(value);
        }
    }

    return (
        <header
            className="position-sticky top-0 bg-white border-bottom shadow-sm"
            style={{ zIndex: 1000 }}
        >
            <div className="container-fluid container-lg px-3 px-sm-4 py-2 py-md-3">

                {/* Top Section with heading and navigation */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">

                    {/* Logo / Heading */}
                    <Link
                        to="/"
                        className="text-warning text-decoration-none d-flex align-items-center gap-2 fw-bold fs-4 text-center text-md-start"
                    >
                        <FaFilm />
                        <span>{heading}</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2 gap-sm-3">
                        {navLinks.map(({ path, label, icon }) => {
                            const isActive = pathname === path;

                            return (
                                <Link
                                    key={path}
                                    to={path}
                                    className={`text-decoration-none fw-semibold d-flex align-items-center gap-2 px-3 py-2 rounded-pill ${
                                        isActive
                                            ? "bg-warning text-dark shadow-sm"
                                            : "text-dark bg-light border"
                                    }`}
                                >
                                    {icon}
                                    <span>{label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Search Section - only shown on home page */}
                {!hideSearch && (
                    <div className="row g-2 mt-3 align-items-center justify-content-center">

                        <div className="col-12 col-md-9 col-lg-10">
                            <Input
                                value={search}
                                setValue={handleInputChange}
                                onSearch={() => onSearch()}
                                placeholder={isMobile ? "Type to search movies..." : "Search movies..."}
                            />
                        </div>

                        <div className="d-none d-md-block col-md-3 col-lg-2">
                            <button
                                className="btn btn-warning w-100 fw-semibold d-flex align-items-center justify-content-center gap-2"
                                onClick={onSearch}
                                aria-label="Search movies"
                            >
                                <FaSearch />
                                <span>Search</span>
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </header>
    );
}
