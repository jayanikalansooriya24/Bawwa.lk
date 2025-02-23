// Navbar Component
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="logo">Bawwa.lk</h1>
      <nav className="nav-links">
        <Link to="/" className="nav-item">ABOUT US</Link>
        <Link to="/services" className="nav-item">SERVICES</Link>
        <Link to="/contact" className="nav-item">CONTACT US</Link>
        <Link to="/team" className="nav-item">TEAM</Link>
        <Link to="/blog" className="nav-item">BLOG</Link>
      </nav>
      <button className="book-now">BOOK NOW</button>
    </header>
  );
};

export default Navbar;