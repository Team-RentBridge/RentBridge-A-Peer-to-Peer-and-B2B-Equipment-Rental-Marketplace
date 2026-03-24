import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

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

  if (!stats || !transactions) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Failed to load data</div>
        </div>
        <Footer />
      </div>
    );
  }

  const statCards = [
    { title: "Total Sales", value: stats.stats.totalListings, icon: "💰" },
    { title: "Total Rentals Given", value: stats.stats.totalRentalsGiven, icon: "📤" },
    { title: "Total Rentals Taken", value: stats.stats.totalRentalsTaken, icon: "📥" },
    { title: "Total Revenue", value: `₹${stats.stats.totalRevenue.toLocaleString()}`, icon: "💵" },
    { title: "Active Rentals", value: stats.stats.activeRentals, icon: "🔄" },
    { title: "Pending Dues", value: `₹${stats.stats.pendingDues.toLocaleString()}`, icon: "⚠️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {stats.user.name}!</h1>
          <p className="text-gray-600">Credibility Score: {stats.stats.credibilityScore}/10</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4">{card.icon}</div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                  <div className="text-sm text-gray-600">{card.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Listings & Transactions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Current Rentals & Transactions</h2>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">S.No.</th>
                  <th className="px-4 py-2 text-left">Product Name</th>
                  <th className="px-4 py-2 text-left">Quantity</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Countdown</th>
                </tr>
              </thead>
              <tbody>
                {transactions.borrowed.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {item.status === 'Overdue' ? `Overdue by ${Math.abs(Math.floor((new Date() - new Date(item.end_date)) / (1000 * 60 * 60 * 24)))} days` :
                       item.status === 'Active' ? `Due in ${Math.max(0, Math.floor((new Date(item.end_date) - new Date()) / (1000 * 60 * 60 * 24)))} days` :
                       'Upcoming'}
                    </td>
                  </tr>
                ))}
                {transactions.lent.map((item, index) => (
                  <tr key={`lent-${item.id}`} className="border-t">
                    <td className="px-4 py-2">{transactions.borrowed.length + index + 1}</td>
                    <td className="px-4 py-2">{item.title} (Lent to {item.borrower_name})</td>
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {item.status === 'Overdue' ? `Overdue by ${Math.abs(Math.floor((new Date() - new Date(item.end_date)) / (1000 * 60 * 60 * 24)))} days` :
                       item.status === 'Active' ? `Due in ${Math.max(0, Math.floor((new Date(item.end_date) - new Date()) / (1000 * 60 * 60 * 24)))} days` :
                       'Upcoming'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;