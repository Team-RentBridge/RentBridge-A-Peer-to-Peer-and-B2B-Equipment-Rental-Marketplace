const pool = require("../config/db");

/*
========================================
GET ADMIN STATS
========================================
*/
exports.getAdminStats = async (req, res) => {
  try {
    // Total businesses (users with role 'business' or equipment owners)
    const totalBusinesses = await pool.query(
      "SELECT COUNT(DISTINCT owner_id) as count FROM equipment"
    );

    // Total peers (regular users)
    const totalPeers = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE role = 'user'"
    );

    // Total transactions (completed bookings)
    const totalTransactions = await pool.query(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'"
    );

    // Total active users (users with recent activity)
    const totalActiveUsers = await pool.query(
      `SELECT COUNT(DISTINCT user_id) as count FROM bookings
       WHERE start_date >= CURRENT_DATE - INTERVAL '30 days'`
    );

    // Daily active users
    const dailyActiveUsers = await pool.query(
      `SELECT COUNT(DISTINCT user_id) as count FROM bookings
       WHERE DATE(start_date) = CURRENT_DATE`
    );

    // Total revenue
    const totalRevenue = await pool.query(
      "SELECT COALESCE(SUM(total_price), 0) as revenue FROM bookings WHERE status = 'completed'"
    );

    // Pending approvals (pending bookings or equipment)
    const pendingApprovals = await pool.query(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'"
    );

    // Reported issues (assuming a reports table, for now use pending bookings)
    const reportedIssues = await pool.query(
      "SELECT COUNT(*) as count FROM bookings WHERE status = 'disputed'"
    );

    res.json({
      totalBusinesses: parseInt(totalBusinesses.rows[0].count),
      totalPeers: parseInt(totalPeers.rows[0].count),
      totalTransactions: parseInt(totalTransactions.rows[0].count),
      totalActiveUsers: parseInt(totalActiveUsers.rows[0].count),
      dailyActiveUsers: parseInt(dailyActiveUsers.rows[0].count),
      totalRevenue: parseFloat(totalRevenue.rows[0].revenue),
      pendingApprovals: parseInt(pendingApprovals.rows[0].count),
      reportedIssues: parseInt(reportedIssues.rows[0].count)
    });

  } catch (err) {
    console.error("GET ADMIN STATS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};