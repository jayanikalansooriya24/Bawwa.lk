import React from 'react';
import "./aboutus.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <br />
      <h1 className="about-title">BawwaLK</h1>

      <p className="about-text">
        Welcome to <span className="highlight">BawwaLK</span> – your go-to destination for premium pet care and accessories. 
        We are passionate about creating a better lifestyle for your furry friends by offering high-quality products, expert advice, and a 
        community that truly cares.
      </p>

      <p className="about-text">
        Founded with love for pets, BawwaLK was built by a team of pet lovers, for pet lovers. 
        Whether you're looking for stylish pet accessories, healthy food options, or grooming essentials, 
        we've got everything your pet needs under one paw-some roof!
      </p>

      <p className="about-text">
        Our mission is to make every pet's life happier, healthier, and more joyful. 
        Join the BawwaLK community and give your pets the care they deserve!
      </p>

      <div className="about-divider"></div>

      <div className="why-choose-us">
        <h2 className="why-title">Why Choose Us?</h2>
        <ul className="why-list">
          <li>🐾 Premium, handpicked pet products</li>
          <li>⭐ Trusted by hundreds of pet parents</li>
          <li>📞 Friendly customer support</li>
          <li>🚚 Fast and secure delivery</li>
        </ul>
      </div>

      <a href="#join" className="about-button">Join the Community</a>
    </div>
  );
};

export default AboutUs;