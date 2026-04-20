const pool = require("../config/db");

/*
========================================
ADD REVIEW
========================================
*/
exports.addReview = async (req, res) => {
  const { equipment_id, rating, comment } = req.body;

  try {
    if (!equipment_id || !rating) {
      return res.status(400).json({ message: "equipment_id and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const result = await pool.query(
      `INSERT INTO reviews (user_id, equipment_id, rating, comment)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [req.user.userId, equipment_id, rating, comment || null]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("ADD REVIEW ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/*
========================================
GET REVIEWS FOR EQUIPMENT
========================================
*/
exports.getReviewsByEquipment = async (req, res) => {
  const { equipment_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.*, u.name as reviewer_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.equipment_id = $1
       ORDER BY r.created_at DESC`,
      [equipment_id]
    );

    // Average rating
    const avgResult = await pool.query(
      `SELECT ROUND(AVG(rating)::numeric, 1) as avg_rating, COUNT(*) as total
       FROM reviews WHERE equipment_id = $1`,
      [equipment_id]
    );

    res.json({
      reviews: result.rows,
      avg_rating: parseFloat(avgResult.rows[0].avg_rating) || 0,
      total_reviews: parseInt(avgResult.rows[0].total)
    });

  } catch (err) {
    console.error("GET REVIEWS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/*
========================================
DELETE REVIEW (owner or admin only)
========================================
*/
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);

    if (review.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Allow if user owns the review or is admin
    if (req.user.role !== "admin" && review.rows[0].user_id !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this review" });
    }

    await pool.query("DELETE FROM reviews WHERE id = $1", [id]);
    res.json({ message: "Review deleted" });

  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
