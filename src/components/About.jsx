import React from 'react';
import '../style/About.css';

export const About = () => {
  return (
    <div id="about" className="about-container">
      <div className="about-content">
        {/* Image Section (Left) */}
        <div className="about-image">
          <img src="/assets/Group 17.png" alt="About Us" className="about-img" />
        </div>

        {/* Text Section (Right) */}
        <div className="text-container">
          <h1 className="about-title">A Taste of Asia</h1>
          <p className="txtabout">
            Welcome to <span className="highlight">Asian Taste</span>, where tradition meets flavor.
            Experience the finest sushi, sashimi, and signature rolls, crafted with fresh ingredients and authentic techniques.
            Whether dining in or ordering takeout, every bite promises quality and taste you’ll love.
          </p>


          {/* Benefits Section */}
          <ul className="benefits">
            <li>Premium Quality Ingredients – Sourced fresh daily for authentic flavors.</li>
            <li>Artisan Craftsmanship – Prepared with precision by expert sushi chefs.</li>
            <li>Fast & Convenient – Enjoy dine-in, takeaway, or doorstep delivery.</li>
          </ul>

          <a href="#menu" className="about-btn">Explore Our Menu</a>
        </div>
      </div>
    </div>
  );
};

export default About;
