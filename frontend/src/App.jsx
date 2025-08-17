import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ItemPage from "./pages/ItemPage";
import ListingsPage from "./pages/ListingsPage"; // <-- import here
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app light"}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage darkMode={darkMode} />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route
            path="/listings"
            element={<ListingsPage darkMode={darkMode} />} // <-- add route
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
