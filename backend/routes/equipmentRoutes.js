const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addEquipment,
  getEquipment,
  getEquipmentById,
  deleteEquipment,
} = require("../controllers/equipmentController");

// Add equipment (authenticated)
router.post("/add", auth, addEquipment);

// Get all equipment (filters + featured) — public
router.get("/", getEquipment);

// Get single equipment — public
router.get("/:id", getEquipmentById);

// Delete equipment (authenticated)
router.delete("/:id", auth, deleteEquipment);

module.exports = router;