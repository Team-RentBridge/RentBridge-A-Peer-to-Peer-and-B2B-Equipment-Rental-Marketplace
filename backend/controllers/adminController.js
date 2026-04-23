const pool = require("../config/db");

/*
========================================
GET ADMIN STATS
========================================
*/
exports.getAdminStats = async (req, res) => {
  try {
    const safeQuery = async (sql, fallback = 0) => {
      try {
        const result = await pool.query(sql);
        return result.rows[0];
      } catch (e) {
        return { count: fallback, revenue: fallback, avg_rating: fallback, total: fallback };
      }
    };

    const [
      totalBusinesses,
      totalPeers,
      totalTransactions,
      totalActiveUsers,
      dailyActiveUsers,
      totalRevenue,
      pendingApprovals,
      reportedIssues,
      totalEquipment,
      totalReviews,
      totalSales,
      totalRentals,
      platformCredibilityResult
    ] = await Promise.all([
      safeQuery("SELECT COUNT(DISTINCT owner_id) as count FROM equipment"),
      safeQuery("SELECT COUNT(*) as count FROM users"),
      safeQuery("SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'"),
      safeQuery(`SELECT COUNT(DISTINCT user_id) as count FROM bookings WHERE start_date >= CURRENT_DATE - INTERVAL '30 days'`),
      safeQuery(`SELECT COUNT(DISTINCT user_id) as count FROM bookings WHERE DATE(start_date) = CURRENT_DATE`),
      safeQuery("SELECT COALESCE(SUM(total_price), 0) as revenue FROM bookings WHERE status = 'completed'"),
      safeQuery("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'"),
      safeQuery("SELECT COUNT(*) as count FROM bookings WHERE status = 'disputed'"),
      safeQuery("SELECT COUNT(*) as count FROM equipment"),
      safeQuery("SELECT COUNT(*) as count FROM reviews"),
      safeQuery("SELECT COUNT(*) as count FROM bookings b JOIN equipment e ON b.equipment_id = e.id WHERE b.status = 'completed' AND e.is_for_sale = true"),
      safeQuery("SELECT COUNT(*) as count FROM bookings b JOIN equipment e ON b.equipment_id = e.id WHERE e.is_for_sale = false OR e.is_for_sale IS NULL"),
      safeQuery("SELECT AVG(rating) as avg_rating FROM reviews")
    ]);

    let platformCredibility = 84;
    if (platformCredibilityResult && platformCredibilityResult.avg_rating) {
      platformCredibility = (parseFloat(platformCredibilityResult.avg_rating) / 5.0) * 100;
    }

    res.json({
      totalBusinesses: parseInt(totalBusinesses.count) || 0,
      totalPeers: parseInt(totalPeers.count) || 0,
      totalTransactions: parseInt(totalTransactions.count) || 0,
      totalActiveUsers: parseInt(totalActiveUsers.count) || 0,
      dailyActiveUsers: parseInt(dailyActiveUsers.count) || 0,
      totalRevenue: parseFloat(totalRevenue.revenue) || 0,
      pendingApprovals: parseInt(pendingApprovals.count) || 0,
      reportedIssues: parseInt(reportedIssues.count) || 0,
      totalEquipment: parseInt(totalEquipment.count) || 0,
      totalReviews: parseInt(totalReviews.count) || 0,
      totalSales: parseInt(totalSales.count) || 0,
      totalRentals: parseInt(totalRentals.count) || 0,
      platformCredibility: parseFloat(platformCredibility.toFixed(1))
    });

  } catch (err) {
    console.error("GET ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
========================================
GET ALL USERS (Admin only)
========================================
*/
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, role FROM users ORDER BY id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET ALL USERS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
========================================
GET ALL BOOKINGS (Admin only)
========================================
*/
exports.getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, e.title as equipment_title, u.name as renter_name
       FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       JOIN users u ON b.user_id = u.id
       ORDER BY b.id DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET ALL BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
========================================
DELETE USER (Admin only)
========================================
*/
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};