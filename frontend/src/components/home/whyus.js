import React from "react";

function WhyUs() {
  return (
    <section className="whyus">
      <h2>Why Choose RentBridge</h2>

      <div className="why-grid">
        <div>
          <h3>Secure Transactions</h3>
          <p>Escrow-based payment system ensures safe rental transactions.</p>
        </div>

        <div>
          <h3>Smart Booking</h3>
          <p>Automated availability system prevents double bookings.</p>
        </div>

        <div>
          <h3>B2B Support</h3>
          <p>Businesses can rent bulk equipment and heavy machinery.</p>
        </div>

        <div>
          <h3>Transparent Reviews</h3>
          <p>Rating system builds trust between renters and lenders.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;