import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, User, LayoutDashboard, ShoppingCart } from "lucide-react";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 w-full glass-dark border-b border-white/10 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
          RentBridge<span className="text-primary-500">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <Link to="/marketplace" className="text-xs font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em]">Marketplace</Link>
          <Link to="/rent" className="text-xs font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em]">Rent Out</Link>
          {user && (
            <Link to="/dashboard" className="text-xs font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em]">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/cart" className="relative group p-2.5 bg-white/5 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all">
                <ShoppingCart className="w-5 h-5 text-white/70 group-hover:text-white" />
              </Link>
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all group">
                  <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-primary-500/20">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:block text-xs font-black text-white/70 group-hover:text-white uppercase tracking-widest">{user?.name || 'User'}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="p-2 text-white/20 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-xs font-black text-white/50 hover:text-white transition-colors px-4 py-2 uppercase tracking-widest">
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-xl font-black text-xs transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
