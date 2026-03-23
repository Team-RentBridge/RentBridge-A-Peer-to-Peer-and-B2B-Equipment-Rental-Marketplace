import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="text-center py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Rent Anything, Anytime
      </h1>

      <ul className="space-y-2 text-lg text-gray-600 mb-8">
        <li>✔ Peer to Peer Rentals</li>
        <li>✔ Business Equipment Rentals</li>
        <li>✔ Secure Escrow Payments</li>
        <li>✔ Live Tracking & Deadlines</li>
      </ul>

      <button
        onClick={() => navigate("/register")}
        className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full text-lg font-semibold transition"
      >
        Start Now
      </button>
    </section>
  );
}

export default Hero;