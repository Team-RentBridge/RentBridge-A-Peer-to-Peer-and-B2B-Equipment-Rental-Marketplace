import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 text-center bg-yellow-100">
      <h2 className="text-3xl font-bold mb-6">
        Start Renting Today
      </h2>

      <button
        onClick={() => navigate("/register")}
        className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-full text-lg font-semibold transition"
      >
        Get Started
      </button>
    </section>
  );
}

export default CTA;