import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import "./SearchPage.css";

const SearchPage = ({ darkMode }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase();

  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        // Fetch items matching search query
        const searchRes = await fetch(
          `http://localhost:5000/api/items${query ? `?q=${query}` : ""}`
        );
        const searchData = await searchRes.json();
        setItems(searchData);

        // Fetch all items for "You may also like"
        const allRes = await fetch("http://localhost:5000/api/items");
        const allData = await allRes.json();

        // Exclude already shown search results
        setAllItems(allData.filter(item => !searchData.some(d => d._id === item._id)));
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [query]);

  return (
    <div className={`search-page ${darkMode ? "dark" : "light"}`}>
      <h2>Search Results for "{query}"</h2>

      {loading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        <div className="results-grid">
          {items.map(item => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
        <>
          <p>No results found for "{query}".</p>
          <h3>You may also like:</h3>
          <div className="results-grid">
            {allItems.map(item => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
