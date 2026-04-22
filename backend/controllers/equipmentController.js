const pool = require("../config/db");

/*
========================================
ADD EQUIPMENT
========================================
*/
exports.addEquipment = async (req, res) => {
  const {
    title,
    description,
    price_per_day,
    penalty_per_day,
    category,
    available_from,
    available_to,
    image_url,
    quantity,
    is_featured
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO equipment
      (title, description, price_per_day, penalty_per_day, category, owner_id, available_from, available_to, image_url, quantity, is_featured)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING *`,
      [
        title,
        description,
        price_per_day,
        penalty_per_day,
        category || 'General',
        req.user.userId,
        available_from || null,
        available_to || null,
        image_url || null,
        quantity || 1,
        is_featured || false
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
========================================
GET ALL EQUIPMENT (FILTER + FEATURED)
========================================
*/
exports.getEquipment = async (req, res) => {
  const { price, featured } = req.query;

  try {
    let query = "SELECT * FROM equipment WHERE 1=1";
    let values = [];

    // Price filter
    if (price) {
      values.push(price);
      query += ` AND price_per_day <= $${values.length}`;
    }

    // Featured logic (2 ways supported)
    if (featured === "true") {
      query += " AND is_featured = true";
    }

    // Default sorting
    query += " ORDER BY id DESC";

    // Limit featured items (homepage)
    if (featured === "true") {
      query += " LIMIT 6";
    }

    const result = await pool.query(query, values);

    // Get ratings for each equipment
    const equipmentWithRatings = await Promise.all(result.rows.map(async (equipment) => {
      const ratingResult = await pool.query(
        `SELECT ROUND(AVG(rating)::numeric, 1) as avg_rating, COUNT(*) as total_reviews
         FROM reviews WHERE equipment_id = $1`,
        [equipment.id]
      );
      
      return {
        ...equipment,
        quantity: equipment.quantity || 0,
        avg_rating: parseFloat(ratingResult.rows[0]?.avg_rating) || 0,
        total_reviews: parseInt(ratingResult.rows[0]?.total_reviews) || 0
      };
    }));

    res.json(equipmentWithRatings);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
========================================
GET SINGLE EQUIPMENT
========================================
*/
exports.getEquipmentById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM equipment WHERE id=$1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    const equipment = result.rows[0];

    // Get ratings for this equipment
    const ratingResult = await pool.query(
      `SELECT ROUND(AVG(rating)::numeric, 1) as avg_rating, COUNT(*) as total_reviews
       FROM reviews WHERE equipment_id = $1`,
      [equipment.id]
    );

    res.json({
      ...equipment,
      avg_rating: parseFloat(ratingResult.rows[0]?.avg_rating) || 0,
      total_reviews: parseInt(ratingResult.rows[0]?.total_reviews) || 0
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
========================================
DELETE EQUIPMENT
========================================
*/
exports.deleteEquipment = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM equipment WHERE id=$1",
      [req.params.id]
    );

    res.json({ message: "Equipment deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

