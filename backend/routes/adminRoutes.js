const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getAdminStats
} = require("../controllers/adminController");

// Admin only middleware
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

router.get("/stats", auth, adminAuth, getAdminStats);

module.exports = router;