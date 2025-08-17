import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSearchBar.css";

const HeroSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="hero">
      <h1 className="hero-title">What would you like to buy?</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </section>
  );
};

export default HeroSearchBar;
