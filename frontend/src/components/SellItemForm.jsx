import React, { useState } from "react";
import "./SellItemForm.css";

const SellItemForm = ({ account, onClose, onItemListed }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(""); // comma-separated URLs
  const [price, setPrice] = useState("");
  const [chain, setChain] = useState("ETH"); // default chain
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) return alert("Connect your wallet first");

    const itemData = {
      seller: account,
      name,
      description,
      images: images.split(",").map((img) => img.trim()),
      price: parseFloat(price),
      chain,
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) throw new Error("Failed to create item");

      const newItem = await res.json();
      onItemListed(newItem);
      onClose(); // close form
    } catch (err) {
      console.error(err);
      alert("Error creating item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sell-item-form-overlay">
      <div className="sell-item-form">
        <h2>List New Item</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Images (comma separated URLs)</label>
          <input value={images} onChange={(e) => setImages(e.target.value)} required />

          <label>Price</label>
          <input
            type="number"
            step="0.0001"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Chain</label>
          <select value={chain} onChange={(e) => setChain(e.target.value)}>
            <option value="ETH">ETH</option>
            <option value="BTC">BTC</option>
            <option value="MATIC">MATIC</option>
            <option value="SOL">SOL</option>
          </select>

          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading ? "Listing..." : "List Item"}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellItemForm;
