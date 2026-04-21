const pool = require("../config/db");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  const { equipment_id, start_date, end_date, quantity = 1 } = req.body;

  try {
    // Get equipment info
    const equipmentRes = await pool.query(
      "SELECT * FROM equipment WHERE id=$1",
      [equipment_id]
    );
    const equipment = equipmentRes.rows[0];
    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    // Check quantity
    if (equipment.quantity < quantity) {
      return res.status(400).json({ message: `Not enough units available. Only ${equipment.quantity} left.`, quantity: equipment.quantity });
    }


    // Calculate price and days
    const price = equipment.price_per_day;
    const days =
      Math.abs(new Date(end_date) - new Date(start_date)) /
        (1000 * 60 * 60 * 24) + 1;
    const total = price * days * quantity;

    // Insert booking
    const booking = await pool.query(
      `INSERT INTO bookings(user_id,equipment_id,start_date,end_date,quantity,total_price,status)
       VALUES($1,$2,$3,$4,$5,$6,'pending')
       RETURNING *`,
      [req.user.userId, equipment_id, start_date, end_date, quantity, total]
    );

    // Decrement equipment quantity
    await pool.query(
      "UPDATE equipment SET quantity = quantity - $2 WHERE id = $1",
      [equipment_id, quantity]
    );

    res.json({ ...booking.rows[0], quantity_left: equipment.quantity - quantity });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BOOKINGS
exports.getUserBookings = async (req, res) => {
  try {

    const bookings = await pool.query(
      `SELECT b.*, e.title
       FROM bookings b
       JOIN equipment e ON b.equipment_id = e.id
       WHERE b.user_id=$1`,
      [req.user.userId]
    );

    res.json(bookings.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// RETURN EQUIPMENT + PENALTY
exports.returnEquipment = async (req, res) => {
  const { booking_id, return_date } = req.body;

  try {

    const booking = await pool.query(
      "SELECT * FROM bookings WHERE id=$1",
      [booking_id]
    );

    if (booking.rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const expected = new Date(booking.rows[0].end_date);
    const actual = new Date(return_date);

 const lateDays = Math.max(
  0,
  Math.floor((actual - expected) / (1000 * 60 * 60 * 24))
);

    let penalty = 0;

    if (lateDays > 0) {

      const equipment = await pool.query(
        "SELECT penalty_per_day FROM equipment WHERE id=$1",
        [booking.rows[0].equipment_id]
      );

      penalty = lateDays * equipment.rows[0].penalty_per_day;

      await pool.query(
        "INSERT INTO penalties(booking_id,late_days,penalty_amount) VALUES($1,$2,$3)",
        [booking_id, lateDays, penalty]
      );
    }

    // Update booking status
    await pool.query(
      "UPDATE bookings SET status='completed' WHERE id=$1",
      [booking_id]
    );

    // Increment equipment quantity
    const returnQuantity = booking.rows[0].quantity || 1;
    await pool.query(
      "UPDATE equipment SET quantity = quantity + $2 WHERE id = $1",
      [booking.rows[0].equipment_id, returnQuantity]
    );

    res.json({
      message: "Return processed",
      lateDays,
      penalty
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};