import React from "react";
import { Link } from "react-router-dom";
import "./ItemCard.css";

const ItemCard = ({ item }) => {
  const { _id, images, name, price, chain } = item;

  return (
    <Link to={`/item/${_id}`} className="item-card-link">
      <div className="item-card">
        <div className="item-image">
          <img src={images[0]} alt={name} /> {/* Use first image */}
        </div>
        <div className="item-info">
          <h3 className="item-name">{name}</h3>
          <p className="item-price">
            {price} <span className="item-chain">{chain}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
