const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addReview, getReviewsByEquipment, deleteReview } = require("../controllers/reviewController");

// Public: get reviews for a piece of equipment
router.get("/equipment/:equipment_id", getReviewsByEquipment);

// Authenticated: add a review
router.post("/", auth, addReview);

// Authenticated: delete a review (own review or admin)
router.delete("/:id", auth, deleteReview);

module.exports = router;
