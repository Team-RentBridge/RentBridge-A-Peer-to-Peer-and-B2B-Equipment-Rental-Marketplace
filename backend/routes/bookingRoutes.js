const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  getUserBookings,
  returnEquipment
} = require("../controllers/bookingController");

router.post("/create", auth, createBooking);
router.get("/user", auth, getUserBookings);
router.post("/return", auth, returnEquipment);

module.exports = router;