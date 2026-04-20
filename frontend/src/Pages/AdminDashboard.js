import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Package, 
  IndianRupee, 
  TrendingUp,
  Activity,
  Plus,
  Star,
  CalendarCheck,
  Trash2,
  RefreshCw
} from "lucide-react";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/footer";

function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const loadData = () => {
    setLoading(true);
    Promise.all([
      API.get("/admin/stats"),
      API.get("/admin/users"),
      API.get("/admin/bookings"),
    ])
      .then(([statsRes, usersRes, bookingsRes]) => {
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setBookings(bookingsRes.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load admin data:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.role !== 'admin') {
      navigate("/dashboard");
      return;
    }
    loadData();
  }, [user, navigate]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const adminStats = [
    { label: "Total Users", value: stats?.totalPeers || 0, icon: Users, color: "text-blue-400" },
    { label: "Equipment Listed", value: stats?.totalEquipment || 0, icon: Package, color: "text-purple-400" },
    { label: "Revenue", value: `₹${stats?.totalRevenue || 0}`, icon: IndianRupee, color: "text-green-400" },
    { label: "Active Users", value: stats?.totalActiveUsers || 0, icon: Activity, color: "text-primary-400" },
    { label: "Transactions", value: stats?.totalTransactions || 0, icon: TrendingUp, color: "text-orange-400" },
    { label: "Daily Active", value: stats?.dailyActiveUsers || 0, icon: Activity, color: "text-cyan-400" },
    { label: "Pending", value: stats?.pendingApprovals || 0, icon: ShieldCheck, color: "text-yellow-400" },
    { label: "Reviews", value: stats?.totalReviews || 0, icon: Star, color: "text-pink-400" },
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "users", label: `Users (${users.length})` },
    { id: "bookings", label: `Bookings (${bookings.length})` },
  ];

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      
      <main className="container mx-auto px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 pt-32">
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

          <div className="flex gap-3">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={loadData}
              className="bg-white/10 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/20 transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => navigate('/add-equipment')}
              className="bg-white text-black px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-primary-500 hover:text-white transition-all shadow-xl active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Equipment
            </motion.button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-10 bg-white/5 p-1.5 rounded-2xl w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-primary-600 text-white shadow-lg"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {adminStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="glass-dark p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group"
                >
                  <div className={`mb-5 p-3 rounded-xl bg-white/5 inline-block ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-black text-white/30 uppercase tracking-widest">{stat.label}</div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>

            {/* Growth chart placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-dark rounded-[3rem] p-12 border border-white/10 shadow-2xl mb-20 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden"
            >
              <div className="relative z-10">
                <TrendingUp className="w-14 h-14 text-primary-500 mx-auto mb-5 opacity-20" />
                <h2 className="text-2xl font-black text-white mb-2">Platform Growth Analytics</h2>
                <p className="text-white/20 font-medium italic">Visualization tools coming soon...</p>
              </div>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                   style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </motion.div>
          </>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden mb-20"
          >
            <div className="p-8 border-b border-white/5 flex items-center gap-3">
              <Users className="w-5 h-5 text-primary-400" />
              <h2 className="text-xl font-black text-white">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-4 text-left">ID</th>
                    <th className="px-8 py-4 text-left">Name</th>
                    <th className="px-8 py-4 text-left">Email</th>
                    <th className="px-8 py-4 text-left">Role</th>
                    <th className="px-8 py-4 text-left">Joined</th>
                    <th className="px-8 py-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-4 text-white/40 text-sm">#{u.id}</td>
                      <td className="px-8 py-4 text-white font-bold">{u.name}</td>
                      <td className="px-8 py-4 text-white/60 text-sm">{u.email}</td>
                      <td className="px-8 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          u.role === 'admin' ? 'bg-primary-600/30 text-primary-300' : 'bg-white/10 text-white/50'
                        }`}>{u.role}</span>
                      </td>
                      <td className="px-8 py-4 text-white/40 text-sm">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : `#${u.id}`}
                      </td>
                      <td className="px-8 py-4">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="py-16 text-center text-white/30 font-medium">No users found</div>
              )}
            </div>
          </motion.div>
        )}

        {/* BOOKINGS TAB */}
        {activeTab === "bookings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden mb-20"
          >
            <div className="p-8 border-b border-white/5 flex items-center gap-3">
              <CalendarCheck className="w-5 h-5 text-primary-400" />
              <h2 className="text-xl font-black text-white">All Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-white/30 text-xs uppercase tracking-widest border-b border-white/5">
                    <th className="px-8 py-4 text-left">ID</th>
                    <th className="px-8 py-4 text-left">Renter</th>
                    <th className="px-8 py-4 text-left">Equipment</th>
                    <th className="px-8 py-4 text-left">Dates</th>
                    <th className="px-8 py-4 text-left">Total</th>
                    <th className="px-8 py-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-8 py-4 text-white/40 text-sm">#{b.id}</td>
                      <td className="px-8 py-4 text-white font-bold">{b.renter_name}</td>
                      <td className="px-8 py-4 text-white/70 text-sm">{b.equipment_title}</td>
                      <td className="px-8 py-4 text-white/50 text-sm">
                        {new Date(b.start_date).toLocaleDateString()} → {new Date(b.end_date).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-4 text-green-400 font-bold">₹{b.total_price}</td>
                      <td className="px-8 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          b.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                          b.status === 'pending'   ? 'bg-yellow-500/20 text-yellow-300' :
                          b.status === 'disputed'  ? 'bg-red-500/20 text-red-300' :
                          'bg-white/10 text-white/50'
                        }`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="py-16 text-center text-white/30 font-medium">No bookings found</div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
