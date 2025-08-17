import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ItemPage.css";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/items/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to fetch item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <h2>Item not found</h2>;

  return (
    <div className="item-page">
      <div className="item-left">
        <img
          src={item.images[0]}
          alt={item.name}
          className="item-main-image"
        />
        {/* Optional: additional images carousel */}
      </div>

      <div className="item-right">
        <h1>{item.name}</h1>
        <p><strong>Seller:</strong> {item.seller}</p>
        <p className="item-price">
          <strong>Price:</strong> {item.price} {item.chain}
        </p>
        <button className="buy-button">Buy Now</button>
        <p className="item-description">{item.description}</p>
      </div>
    </div>
  );
};

export default ItemPage;
