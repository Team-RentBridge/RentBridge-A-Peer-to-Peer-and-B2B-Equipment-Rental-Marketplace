const jwt = require("jsonwebtoken");
const pool = require("../config/db");

module.exports = async function(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If token has isAdmin flag set to true → look up admin table
    if (decoded.isAdmin === true && decoded.adminId) {
      const admin = await pool.query(
        "SELECT id, email FROM admin WHERE id = $1",
        [decoded.adminId]
      );

      if (admin.rows.length === 0) {
        return res.status(401).json("Admin not found");
      }

      req.user = {
        userId: admin.rows[0].id,
        name: "Admin",
        email: admin.rows[0].email,
        role: "admin",
      };

    } else if (decoded.userId) {
      // Regular user token → look up users table
      const user = await pool.query(
        "SELECT id, name, email, role FROM users WHERE id = $1",
        [decoded.userId]
      );

      if (user.rows.length === 0) {
        return res.status(401).json("User not found");
      }

      req.user = {
        userId: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      };

    } else {
      return res.status(401).json("Invalid token payload");
    }

    next();

  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};