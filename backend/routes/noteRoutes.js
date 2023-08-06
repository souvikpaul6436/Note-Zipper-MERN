const express = require("express");
const {
  getNotes,
  UpdateNote,
  createNote,
  DeleteNote,
  getNoteById,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();


router.route("/get").get(protect,getNotes);
router.route("/create").post(protect,createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote);

module.exports = router; 
