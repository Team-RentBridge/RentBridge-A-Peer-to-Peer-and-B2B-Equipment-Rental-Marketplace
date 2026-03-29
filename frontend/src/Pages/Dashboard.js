import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  Clock, 
  CreditCard, 
  ArrowUpRight,
  TrendingUp,
  User
} from "lucide-react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    Promise.all([
      API.get("/user/stats"),
      API.get("/user/transactions")
    ])
      .then(([statsRes, transRes]) => {
        setStats(statsRes.data);
        setTransactions(transRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const statCards = [
    { label: "Total Rentals", value: stats?.total_rentals || 0, icon: Package, color: "text-blue-400" },
    { label: "Active Orders", value: stats?.active_rentals || 0, icon: Clock, color: "text-purple-400" },
    { label: "Total Spent", value: `₹${stats?.total_spent || 0}`, icon: CreditCard, color: "text-green-400" },
    { label: "Trust Score", value: "98%", icon: TrendingUp, color: "text-primary-400" },
  ];

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary-600 flex items-center justify-center font-black text-xl">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">Welcome back, {user?.name || 'User'}</h1>
              <p className="text-white/40 font-medium italic">Manage your rentals and project fleet</p>
            </div>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {statCards.map((stat, idx) => (
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

        {/* Recent Transactions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-dark rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl mb-20"
        >
          <div className="p-10 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-tight">Recent Activity</h2>
            <button className="text-xs font-black text-primary-400 uppercase tracking-widest hover:text-primary-300 transition-colors">
              View All History
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-10 py-6">Equipment</th>
                  <th className="px-10 py-6">Date</th>
                  <th className="px-10 py-6">Amount</th>
                  <th className="px-10 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions?.map((t, idx) => (
                  <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-10 py-8">
                      <div className="font-bold text-white group-hover:text-primary-400 transition-colors">{t.title}</div>
                      <div className="text-xs text-white/30 font-medium">{t.category}</div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="text-sm font-bold text-white/60">
                        {new Date(t.start_date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-10 py-8 font-black text-white">₹{t.total_price}</td>
                    <td className="px-10 py-8">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        t.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                        'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 bg-white/5 rounded-xl hover:bg-primary-600 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {(!transactions || transactions.length === 0) && (
                  <tr>
                    <td colSpan="5" className="px-10 py-20 text-center text-white/20 font-medium italic">
                      No recent activity found. Start renting to see your history here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
