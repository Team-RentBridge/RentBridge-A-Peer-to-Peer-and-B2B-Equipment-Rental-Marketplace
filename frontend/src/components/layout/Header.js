import React from "react";
import "../styles/home.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">RentBridge</div>
      <button className="signin-btn">Sign In</button>
    </header>
  );
}

export default Header;