import React from "react";
import "./SellItemCard.css";

const SellItemCard = ({ item }) => {
  const { _id, images, name, price, chain, status } = item;

  return (
    <div className="sell-item-card">
      <div className="sell-item-image">
        <img src={images[0]} alt={name} />
      </div>
      <div className="sell-item-info">
        <h3 className="sell-item-name">{name}</h3>
        <p className="sell-item-price">
          {price} <span className="sell-item-chain">{chain}</span>
        </p>
        {status && (
          <p className={`sell-item-status ${status.toLowerCase()}`}>
            Status: {status}
          </p>
        )}
        {/* Optional: add buttons for edit/delete */}
        {/* <button>Edit</button>
        <button>Delete</button> */}
      </div>
    </div>
  );
};

export default SellItemCard;
