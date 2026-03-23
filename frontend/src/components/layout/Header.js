import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">RentBridge</h1>

      <button
        onClick={() => navigate("/register")}
        className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Sign Up
      </button>
    </header>
  );
}

export default Header;