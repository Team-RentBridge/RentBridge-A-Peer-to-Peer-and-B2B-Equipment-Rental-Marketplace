import React from "react";

function Features() {
  return (
    <section className="features">
      <h2>Our Features</h2>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>Escrow-based payment system to protect both renters and owners.</p>
        </div>

        <div className="feature-card">
          <h3>Smart Booking</h3>
          <p>Availability calendar prevents double bookings.</p>
        </div>

        <div className="feature-card">
          <h3>B2B Rentals</h3>
          <p>Businesses can rent bulk equipment and heavy machinery.</p>
        </div>

        <div className="feature-card">
          <h3>Admin Monitoring</h3>
          <p>Admin dashboard tracks transactions and platform activity.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;