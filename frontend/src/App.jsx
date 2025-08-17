import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ItemPage from "./pages/ItemPage";
import ListingsPage from "./pages/ListingsPage";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [account, setAccount] = useState(null); // ← add account state

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Initialize wallet on page load
  useEffect(() => {
    const initWallet = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts && accounts[0]) setAccount(accounts[0]);

      const handleAccountsChanged = (accs) => setAccount(accs[0] || null);
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
        }
      };
    };
    initWallet();
  }, []);

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app light"}>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          account={account}        // ← pass account to Navbar
          setAccount={setAccount}  // ← pass setAccount to Navbar
        />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage darkMode={darkMode} />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route
            path="/listings"
            element={<ListingsPage darkMode={darkMode} account={account} />} // ← pass account here
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
