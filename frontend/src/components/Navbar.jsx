import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "./Navbar.css";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);

  const shortAddr = (addr) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected. Please install the MetaMask extension.");
        return;
      }
      setConnecting(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0] || null);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      if (accounts && accounts[0]) setAccount(accounts[0]);

      const handleAccountsChanged = (accs) => setAccount(accs[0] || null);
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    };
    init();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        BitShop
      </div>

      <div className="nav-actions">
        <button className="toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? "🌙" : "☀️"}
        </button>

        <button className="wallet-btn" onClick={connectWallet} disabled={connecting}>
          {account ? shortAddr(account) : connecting ? "Connecting..." : "Connect Wallet"}
        </button>

        <button className="orders-btn" onClick={() => navigate("/orders")}>
          Orders
        </button>

        <button className="listings-btn" onClick={() => navigate("/listings")}>
          Listings
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
