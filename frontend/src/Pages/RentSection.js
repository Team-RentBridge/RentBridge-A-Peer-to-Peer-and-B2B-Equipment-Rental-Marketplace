import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  RotateCcw
} from "lucide-react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

function RentSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = () => {
    API.get("/user/transactions")
      .then(res => {
        const borrowed = res.data.borrowed || [];
        const lent = res.data.lent || [];
        const combined = [...borrowed, ...lent].sort((a, b) => 
          new Date(b.start_date) - new Date(a.start_date)
        );
        setTransactions(combined);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load transactions:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchTransactions();
  }, [user, navigate]);

  const handleReturn = async (itemId) => {
    try {
      await API.post("/bookings/return", {
        booking_id: itemId,
        return_date: new Date().toISOString()
      });
      alert('Item returned successfully!');
      fetchTransactions();
    } catch (err) {
      alert('Failed to return item.');
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black tracking-tight flex items-center gap-4"
          >
            <RotateCcw className="text-primary-500 w-10 h-10" />
            Active Rentals
          </motion.h1>
          <p className="text-white/40 mt-4 font-medium italic">Track your current equipment leases and returns</p>
        </header>

        <div className="space-y-8 mb-20">
          <AnimatePresence mode="popLayout">
            {transactions?.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-dark p-8 rounded-[2.5rem] border border-white/5 flex flex-col lg:flex-row items-center gap-10 group"
              >
                {/* Equipment Preview */}
                <div className="w-full lg:w-48 h-48 rounded-3xl overflow-hidden border border-white/10 flex-shrink-0">
                  <img 
                    src={item.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ede?auto=format&fit=crop&q=80&w=400"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.title} 
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-primary-400 transition-colors">{item.title}</h3>
                    <p className="text-white/30 text-xs font-black uppercase tracking-[0.2em] mt-1">{item.category}</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-2">
                    <div className="flex items-center gap-2 text-white/60">
                      <Clock className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-bold">Start: {new Date(item.start_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Truck className="w-4 h-4 text-primary-500" />
                      <span className="text-sm font-bold">End: {new Date(item.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-center lg:items-end gap-6 min-w-[200px]">
                  <div className="text-right">
                    <div className="text-2xl font-black text-white">₹{item.total_price}</div>
                    <div className={`flex items-center gap-2 mt-1 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                      'bg-primary-500/20 text-primary-400 border-primary-500/30'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> : <Zap className="w-3 h-3 animate-pulse" />}
                      {item.status}
                    </div>
                  </div>

                  {item.status !== 'completed' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReturn(item.id)}
                      className="bg-white text-black px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-primary-500 hover:text-white transition-all shadow-xl"
                    >
                      Return Equipment
                      <RotateCcw className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {(!transactions || transactions.length === 0) && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 glass-dark rounded-[3rem] border border-dashed border-white/10"
            >
              <AlertCircle className="w-16 h-16 text-white/10 mx-auto mb-6" />
              <p className="text-white/40 font-medium italic text-xl">No active rentals found at the moment.</p>
              <button 
                onClick={() => navigate('/marketplace')}
                className="mt-10 bg-primary-600 hover:bg-primary-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-primary-500/20"
              >
                Explore Marketplace
              </button>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RentSection;
