import React from "react";
import "../../styles/marketplace.css";

function ProductCard({ title, price, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />

      <h3>{title}</h3>

      <p className="price">₹{price}/day</p>

      <button className="primary-btn">View Details</button>
    </div>
  );
}

export default ProductCard;