import React, { useState, useEffect, useRef } from "react";
import { Category as CategoryData } from '../data.jsx';
import '../style/main.css';

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryInView, setIsCategoryInView] = useState(false);
  const [isMenuInView, setIsMenuInView] = useState(false);

  const categoryRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, 
      rootMargin: "0px",
      threshold: 0.5,
    };

    const categoryObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsCategoryInView(entry.isIntersecting);
    }, options);

    const menuObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setIsMenuInView(entry.isIntersecting);
    }, options);

    if (categoryRef.current) categoryObserver.observe(categoryRef.current);
    if (menuRef.current) menuObserver.observe(menuRef.current);

    return () => {
      if (categoryRef.current) categoryObserver.unobserve(categoryRef.current);
      if (menuRef.current) menuObserver.unobserve(menuRef.current);
    };
  }, []);

  return (
    <div id="Categories" className="main-container">
      {/* Category Title */}
      <h1
        className={`title-category ${isCategoryInView ? 'active' : ''}`}
        ref={categoryRef}
      >
        Explore Our Categories
      </h1>

      {/* Category Grid */}
      <section className="category-grid">
        {CategoryData.map((item) => (
          <div
            key={item.id}
            className={`category-item ${selectedCategory && selectedCategory.id === item.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(item)}
          >
            <img className="category-image" src={item.ImageSrc} alt={item.Name} />
            <h4 className="category-name">{item.Name}</h4>
          </div>
        ))}
      </section>

      {/* Menu Title */}
      <h2
        className={`title-menu ${isMenuInView ? 'active' : ''}`}
        ref={menuRef}
      >
        Our Signature Menu
      </h2>

      {/* Menu Grid */}
      <section className="menu-grid">
        {CategoryData.filter(category =>
          !selectedCategory || category.id === selectedCategory.id
        ).map((category) =>
          category.menu.map((item) => (
            <div key={item.id} className="menu-card">
              <img className="menu-card-img" src={item.ImageSrc} alt={item.Description} />
              <h4 className="menu-card-price">{item.Price} DH</h4>
              <p className="menu-card-description">{item.Description}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
