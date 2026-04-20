const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
========================================
SIGNUP (regular users only)
========================================
*/
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("BODY:", req.body); // 🔥 Debug

  try {
    // ❌ validation (important)
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🔐 hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ insert user (Admin registration is strictly via admin table, not here)
    const result = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword, "user"]
    );

    res.status(201).json({
      message: "User registered successfully ✅",
      user: result.rows[0],
    });

  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err);

    // 🔴 duplicate email error
    if (err.code === "23505") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: err.message || err,
      stack: err.stack,
    });
  }
};

/*
========================================
LOGIN — checks admin table first, then users table
========================================
*/
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ❌ validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    // 🔍 Check admin table first
    const adminResult = await pool.query(
      "SELECT * FROM admin WHERE email = $1",
      [email]
    );

    if (adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];

      // 🔐 compare password
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // 🔑 generate token with isAdmin flag
      const token = jwt.sign(
        { adminId: admin.id, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        message: "Admin login successful ✅",
        token,
        user: {
          id: admin.id,
          name: "Admin",
          email: admin.email,
          role: "admin",
        },
      });
    }

    // 🔍 fall through — check users table
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = userResult.rows[0];

    // 🔐 compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔑 generate token
    const token = jwt.sign(
      { userId: user.id, isAdmin: false },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};