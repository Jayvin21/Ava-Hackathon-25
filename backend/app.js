const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
require("dotenv").config();

// Connect to DB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Import routes
const itemRoutes = require("./routes/itemRoutes");

// Use routes
app.use("/api/items", itemRoutes);

// Test route
app.get("/", (req, res) => res.send("API running"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
