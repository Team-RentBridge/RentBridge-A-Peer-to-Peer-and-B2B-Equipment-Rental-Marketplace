function Features() {
  return (
    <section className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">Features</h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="p-6 border rounded-xl shadow-sm">
          🔒 Secure Payments
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          ⚡ Fast Booking
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          📅 Availability Tracking
        </div>
        <div className="p-6 border rounded-xl shadow-sm">
          🤝 Peer + Business Support
        </div>
      </div>
    </section>
  );
}

export default Features;