const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    seller: {
      type: String, // can store wallet address or seller ID
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: [String], // array of image URLs
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    chain: {
      type: String, // ETH, BTC, MATIC, etc.
      required: true,
    },
    location: {
      type: String, // physical location or city
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

module.exports = mongoose.model("Item", ItemSchema);
