const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  addEquipment,
  getEquipment,
  getEquipmentById,
  deleteEquipment,
  createEquipment
} = require("../controllers/equipmentController");

// Add equipment
router.post("/add", auth, addEquipment);

// Add a route for creating new equipment
router.post("/", createEquipment);

// Get all equipment (filters + featured)
router.get("/", getEquipment);

// Get single equipment
router.get("/:id", getEquipmentById);

// Delete equipment
router.delete("/:id", auth, deleteEquipment);

module.exports = router;