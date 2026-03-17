import React from "react";
import "../styles/home.css";

function Preview() {
  return (
    <section className="preview">
      <h2>Inside the Platform</h2>

      <p>
        Manage rentals, track bookings, and monitor transactions through an
        intuitive dashboard designed for both individuals and businesses.
      </p>

      <div className="preview-images">
        <div className="preview-box">Dashboard Preview</div>
        <div className="preview-box">Marketplace Preview</div>
        <div className="preview-box">Admin Panel Preview</div>
      </div>
    </section>
  );
}

export default Preview;