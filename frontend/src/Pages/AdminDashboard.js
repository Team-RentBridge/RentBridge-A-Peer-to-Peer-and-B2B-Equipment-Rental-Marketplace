import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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

    // Check if admin
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Failed to load stats</div>
        </div>
        <Footer />
      </div>
    );
  }

  const statCards = [
    { title: "Total Businesses", value: stats.totalBusinesses, icon: "🏢" },
    { title: "Total Peers", value: stats.totalPeers, icon: "👥" },
    { title: "Total Transactions", value: stats.totalTransactions, icon: "💰" },
    { title: "Total Active Users", value: stats.totalActiveUsers, icon: "👤" },
    { title: "Daily Active Users", value: stats.dailyActiveUsers, icon: "📅" },
    { title: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString()}`, icon: "💵" },
    { title: "Pending Approvals", value: stats.pendingApprovals, icon: "⏳" },
    { title: "Reported Issues", value: stats.reportedIssues, icon: "⚠️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{card.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                  <div className="text-sm text-gray-600">{card.title}</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional sections can be added here */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Users Management</h3>
            <p className="text-gray-600">Manage user accounts and permissions</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Listings Management</h3>
            <p className="text-gray-600">Review and moderate equipment listings</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Transactions Log</h3>
            <p className="text-gray-600">View all rental transactions and history</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;