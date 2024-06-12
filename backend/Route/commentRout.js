const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const { commentPost } = require("../controller/commentController");

router.post("/:postId", protect, commentPost);

module.exports = router;
