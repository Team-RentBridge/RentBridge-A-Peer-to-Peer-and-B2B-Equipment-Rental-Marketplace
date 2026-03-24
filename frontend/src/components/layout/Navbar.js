import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar({ showSearch = false, searchValue = "", onSearchChange = () => {} }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white flex justify-between items-center p-4">

      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => navigate("/")}
      >
        RentBridge
      </h1>

      {showSearch && (
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-gray-900"
          />
        </div>
      )}

      <div className="flex gap-4 items-center">

        <button
          onClick={() => navigate("/cart")}
          className="hover:text-gray-300 transition-colors"
        >
          🛒 Cart
        </button>

        {user ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:text-gray-300 transition-colors"
            >
              👤 Profile
            </button>

            <button
              onClick={() => navigate("/rent")}
              className="hover:text-gray-300 transition-colors"
            >
              📅 Rent Section
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="hover:text-gray-300 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="hover:text-gray-300 transition-colors"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="hover:text-gray-300 transition-colors"
            >
              Signup
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar;