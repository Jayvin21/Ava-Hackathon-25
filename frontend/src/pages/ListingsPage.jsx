import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SellItemCard from "../components/SellItemCard";
import SellItemForm from "../components/SellItemForm";
import "./ListingsPage.css";

const ListingsPage = ({ darkMode, account }) => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch items sold by this account
  useEffect(() => {
    if (!account) return;

    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items?seller=${account}`);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch seller items:", err);
      }
    };

    fetchItems();
  }, [account]);

  // Called when a new item is listed via form
  const handleItemListed = (newItem) => {
    setItems([newItem, ...items]); // prepend to show latest item first
    setShowForm(false); // close form automatically
  };

  return (
    <div className={`listings-page ${darkMode ? "dark" : "light"}`}>
      <div className="listings-content">
        <div className="listings-header">
          <h2>My Listings</h2>
          <button className="sell-new-item-btn" onClick={() => setShowForm(true)}>
            Sell New Item
          </button>
        </div>

        <div className="listings-grid">
          {items.length > 0 ? (
            items.map((item) => <SellItemCard key={item._id} item={item} />)
          ) : (
            <p>No items found for your account.</p>
          )}
        </div>
      </div>

      {showForm && (
        <SellItemForm
          account={account}
          onClose={() => setShowForm(false)}
          onItemListed={handleItemListed}
        />
      )}
    </div>
  );
};

export default ListingsPage;
