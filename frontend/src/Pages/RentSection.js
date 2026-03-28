import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function RentSection() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState("rent-from-peer");
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    API.get("/user/transactions")
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load transactions:", err);
        setLoading(false);
      });
  }, [user, navigate]);
  const handleReturn = async (itemId) => {
    try {
      await API.post("/bookings/return", {
        booking_id: itemId,
        return_date: new Date().toISOString()
      });
      alert('Item returned successfully!');
      // Refresh transactions
      const res = await API.get("/user/transactions");
      setTransactions(res.data);
    } catch (err) {
      alert('Failed to return item.');
    }
  };
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

  const getFilteredTransactions = () => {
    if (!transactions) return [];

    if (mode === "rent-from-peer") {
      return transactions.borrowed;
    } else {
      return transactions.lent;
    }
  };

  const filteredTransactions = getFilteredTransactions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Rent Section</h1>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1 flex">
            <button
              onClick={() => setMode("rent-from-peer")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                mode === "rent-from-peer" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Rent from Peer
            </button>
            <button
              onClick={() => setMode("rent-from-business")}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                mode === "rent-from-business" ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Rent from Business
            </button>
          </div>
        </div>

        {/* Live Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">
              {mode === "rent-from-peer" ? "Items Rented from Peers" : "Items Rented to Others"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left">S.No.</th>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Quantity</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Live Countdown</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((item, index) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={item.image_url || '/placeholder.jpg'}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded mr-3"
                        />
                        <span className="font-medium">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">1</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' :
                        item.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {item.status === 'Overdue' ?
                        <span className="text-red-600 font-semibold">
                          Overdue by {Math.abs(Math.floor((new Date() - new Date(item.end_date)) / (1000 * 60 * 60 * 24)))} days
                        </span> :
                        item.status === 'Active' ?
                        <span className="text-orange-600 font-semibold">
                          Due in {Math.max(0, Math.floor((new Date(item.end_date) - new Date()) / (1000 * 60 * 60 * 24)))} days
                        </span> :
                        <span className="text-blue-600">Upcoming</span>
                      }
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          View Details
                        </button>
                        {item.status === 'Active' && (
                          <button
                            className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                            onClick={() => handleReturn(item.id)}
                          >
                            Return
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No {mode === "rent-from-peer" ? "rented items" : "lent items"} found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RentSection;