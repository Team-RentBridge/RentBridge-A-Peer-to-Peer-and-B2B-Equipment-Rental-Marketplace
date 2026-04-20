const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getAdminStats,
  getAllUsers,
  getAllBookings,
  deleteUser,
} = require("../controllers/adminController");

// Admin only middleware — uses role flag set by authMiddleware
const adminAuth = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

router.get("/stats", auth, adminAuth, getAdminStats);
router.get("/users", auth, adminAuth, getAllUsers);
router.get("/bookings", auth, adminAuth, getAllBookings);
router.delete("/users/:id", auth, adminAuth, deleteUser);

module.exports = router;