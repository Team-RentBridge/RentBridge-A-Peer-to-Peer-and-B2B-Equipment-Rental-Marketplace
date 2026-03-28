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

    // Ensure quantity is included in the response
    const equipmentWithQuantity = result.rows.map(equipment => ({
      ...equipment,
      quantity: equipment.quantity || 0
    }));

    res.json(equipmentWithQuantity);

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

    res.json(result.rows[0]);

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

// Add a function to handle creating new equipment
exports.createEquipment = async (req, res) => {
    try {
        const { name, description, image_url, price, quantity } = req.body;

        // Validate input
        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'Name, price, and quantity are required.' });
        }

        // Create new equipment
        const newEquipment = await Equipment.create({
            name,
            description,
            image_url,
            price,
            quantity,
        });

        res.status(201).json(newEquipment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};