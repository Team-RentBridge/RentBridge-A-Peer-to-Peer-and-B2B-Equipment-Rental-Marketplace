const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/*
========================================
SIGNUP
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

    // ✅ insert user with default role (Admin registration is strictly internal)
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
LOGIN
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

    // 🔍 find user
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // 🔐 compare password
    const valid = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!valid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // 🔑 generate token
    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
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