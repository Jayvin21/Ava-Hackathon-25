const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// GET all items or by search query
router.get("/", async (req, res) => {
  try {
    const { q, seller } = req.query;
    let filter = {};

    if (q) {
      const regex = new RegExp(q, "i"); // case-insensitive search
      filter.name = regex;
    }

    if (seller) {
      filter.seller = seller;
    }

    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST new item
router.post("/", async (req, res) => {
  const { seller, name, description, images, price, chain } = req.body;

  if (!seller || !name || !images || !price || !chain) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const newItem = new Item({
    seller,
    name,
    description,
    images,
    price,
    chain,
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
