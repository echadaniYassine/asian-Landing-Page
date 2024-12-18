import React, { useState } from "react";
import { Category as CategoryData } from '../data.jsx';
import './main.css';

export default function Main() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <div id="Categories">
        <h1 className="title-category">Categories</h1>
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

        <h2 className="title-menu">Menu</h2>
        <section className="menu-grid">
          {CategoryData.filter(category =>
            !selectedCategory || category.id === selectedCategory.id // Fix the comparison to selectedCategory.id
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
    </>
  );
}
