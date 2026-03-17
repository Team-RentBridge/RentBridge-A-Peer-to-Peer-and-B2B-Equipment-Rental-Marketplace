import React from "react";
import "../styles/home.css";

function Categories() {
  const categories = [
    "Construction Tools",
    "Electronics",
    "Camera & Media Gear",
    "Event Equipment",
    "Heavy Machinery",
    "Home Tools"
  ];

  return (
    <section className="categories">
      <h2>Browse Rental Categories</h2>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <h3>{cat}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;