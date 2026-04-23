const pool = require("../config/db");

/*
========================================
GET USER PROFILE STATS
========================================
*/
exports.getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user basic info
    const user = await pool.query(
      "SELECT name, email, role FROM users WHERE id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Total sales (equipment listed by user)
    const totalListings = await pool.query(
      "SELECT COUNT(*) as count FROM equipment WHERE owner_id = $1",
      [userId]
    );

    // Total rentals given (bookings where user is owner)
    const rentalsGiven = await pool.query(
      `SELECT COUNT(*) as count FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE e.owner_id = $1`,
      [userId]
    );

    // Total rentals taken (bookings made by user)
    const rentalsTaken = await pool.query(
      "SELECT COUNT(*) as count FROM bookings WHERE user_id = $1",
      [userId]
    );

    // Total revenue from rentals
    const totalRevenue = await pool.query(
      `SELECT COALESCE(SUM(b.total_price), 0) as revenue FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE e.owner_id = $1 AND b.status = 'completed'`,
      [userId]
    );

    // Active rentals (ongoing)
    const activeRentals = await pool.query(
      `SELECT COUNT(*) as count FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE (e.owner_id = $1 OR b.user_id = $1) AND b.status = 'active'`,
      [userId]
    );

    // Pending dues (overdue rentals where user owes money)
    const pendingDues = await pool.query(
      `SELECT COALESCE(SUM(
        CASE WHEN CURRENT_DATE > b.end_date THEN
          (CURRENT_DATE - b.end_date) * e.penalty_per_day
        ELSE 0 END
      ), 0) as dues FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE b.user_id = $1 AND b.status = 'active'`,
      [userId]
    );

    // Credibility Score (dynamic)
    const credibilityResult = await pool.query(
      `SELECT AVG(rating) as avg_rating FROM reviews WHERE owner_id = $1`,
      [userId]
    );
    let credibilityScore = 84; // Default if no reviews
    if (credibilityResult.rows[0].avg_rating) {
      credibilityScore = (parseFloat(credibilityResult.rows[0].avg_rating) / 5.0) * 100;
    }

    res.json({
      user: user.rows[0],
      stats: {
        totalListings: parseInt(totalListings.rows[0].count),
        totalRentalsGiven: parseInt(rentalsGiven.rows[0].count),
        totalRentalsTaken: parseInt(rentalsTaken.rows[0].count),
        totalRevenue: parseFloat(totalRevenue.rows[0].revenue),
        activeRentals: parseInt(activeRentals.rows[0].count),
        pendingDues: parseFloat(pendingDues.rows[0].dues),
        credibilityScore: parseFloat(credibilityScore.toFixed(1))
      }
    });

  } catch (err) {
    console.error("GET USER STATS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/*
========================================
GET USER ACTIVE LISTINGS/TRANSACTIONS
========================================
*/
exports.getUserTransactions = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get rentals where user is borrower
    const borrowedItems = await pool.query(
      `SELECT b.*, e.title, e.image_url, e.is_for_sale, e.buy_price,
       CASE
         WHEN b.status = 'completed' THEN 'completed'
         WHEN CURRENT_DATE > b.end_date THEN 'Overdue'
         WHEN CURRENT_DATE <= b.end_date AND CURRENT_DATE >= b.start_date THEN 'Active'
         ELSE 'Upcoming'
       END as status,
       CASE
         WHEN CURRENT_DATE > b.end_date THEN
           (CURRENT_DATE - b.end_date) * e.penalty_per_day
         ELSE 0
       END as penalty
       FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE b.user_id = $1
       ORDER BY b.start_date DESC`,
      [userId]
    );

    // Get rentals where user is lender
    const lentItems = await pool.query(
      `SELECT b.*, e.title, e.image_url, e.is_for_sale, e.buy_price, u.name as borrower_name,
       CASE
         WHEN b.status = 'completed' THEN 'completed'
         WHEN CURRENT_DATE > b.end_date THEN 'Overdue'
         WHEN CURRENT_DATE <= b.end_date AND CURRENT_DATE >= b.start_date THEN 'Active'
         ELSE 'Upcoming'
       END as status
       FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       JOIN users u ON b.user_id = u.id
       WHERE e.owner_id = $1
       ORDER BY b.start_date DESC`,
      [userId]
    );

    res.json({
      borrowed: borrowedItems.rows,
      lent: lentItems.rows
    });

  } catch (err) {
    console.error("GET USER TRANSACTIONS ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};