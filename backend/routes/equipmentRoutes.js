const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  addEquipment,
  getEquipment,
  getEquipmentById,
  deleteEquipment
} = require("../controllers/equipmentController");

// Add equipment
router.post("/add", auth, addEquipment);

// Get all equipment (filters + featured)
router.get("/", getEquipment);

// Get single equipment
router.get("/:id", getEquipmentById);

// Delete equipment
router.delete("/:id", auth, deleteEquipment);

module.exports = router;