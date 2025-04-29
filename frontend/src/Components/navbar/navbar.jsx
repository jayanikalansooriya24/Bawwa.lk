import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <header className="navbar">
      <h1 className="logo">BawwaLK</h1>
      <nav className="nav-links">
        <Link to="/" className="nav-item">HOME</Link>
        
        <div 
          className="nav-item dropdown"
          onMouseEnter={() => setIsServicesOpen(true)}
          onMouseLeave={() => setIsServicesOpen(false)}
        >
          <Link to="/services">SERVICES</Link>
        </div>

        <div 
          className="nav-item dropdown"
          onMouseEnter={() => setIsShopOpen(true)}
          onMouseLeave={() => setIsShopOpen(false)}
        >
          <Link to="/shop">SHOP</Link>
          {isShopOpen && (
            <div className="dropdown-menu">
              <Link to="/shop/foods">Pet Foods</Link>
              <Link to="/shop/accessories">Accessories</Link>
              <Link to="/shop/toys">Toys</Link>
              <Link to="/shop/health">Health & Wellness</Link>
            </div>
          )}
        </div>

        <Link to="/aboutus" className="nav-item">ABOUT US</Link>
        <Link to="/team" className="nav-item">TEAM</Link>

        <div 
          className="nav-item dropdown"
          onMouseEnter={() => setIsBlogOpen(true)}
          onMouseLeave={() => setIsBlogOpen(false)}
        >
          <Link to="/blog">BLOG</Link>
          {isBlogOpen && (
            <div className="dropdown-menu">
              <Link to="/nutrientplans">Nutrition Plans</Link>
              <Link to="/nutrientcalculator">Nutrient Calculator</Link>
              <Link to="/petdietplans">Pet Diet Plans</Link>
            </div>
          )}
        </div>
      </nav>
      <div className="button-container">
        <button className="book-now">Sign In</button>
        <button className="book-now">My Profile</button>
      </div>
    </header>
  );
};

export default Navbar;