const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getUserStats,
  getUserTransactions
} = require("../controllers/userController");

router.get("/stats", auth, getUserStats);
router.get("/transactions", auth, getUserTransactions);

module.exports = router;