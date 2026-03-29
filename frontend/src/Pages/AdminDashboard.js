import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Package, 
  IndianRupee, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  Plus
} from "lucide-react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== 'admin') {
      navigate("/dashboard");
      return;
    }

    API.get("/admin/stats")
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load admin stats:", err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const adminStats = [
    { label: "Total Users", value: stats?.total_users || 0, icon: Users, color: "text-blue-400" },
    { label: "Total Equipment", value: stats?.total_equipment || 0, icon: Package, color: "text-purple-400" },
    { label: "Revenue", value: `₹${stats?.total_revenue || 0}`, icon: IndianRupee, color: "text-green-400" },
    { label: "Active Rentals", value: stats?.active_rentals || 0, icon: Activity, color: "text-primary-400" },
  ];

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Admin Console</h1>
              <p className="text-white/40 font-medium italic">Global platform overview and control</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate('/add-equipment')}
            className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-primary-500 hover:text-white transition-all shadow-xl active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add New Equipment
          </motion.button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {adminStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-dark p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group"
            >
              <div className={`mb-6 p-3 rounded-xl bg-white/5 inline-block ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-black text-white/30 uppercase tracking-widest">{stat.label}</div>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Growth/Activity Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-dark rounded-[3rem] p-12 border border-white/10 shadow-2xl mb-20 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
        >
          <div className="relative z-10">
            <TrendingUp className="w-16 h-16 text-primary-500 mx-auto mb-6 opacity-20" />
            <h2 className="text-2xl font-black text-white mb-2">Platform Growth Analytics</h2>
            <p className="text-white/20 font-medium italic">Visualization tools coming soon...</p>
          </div>
          
          {/* Decorative grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
