const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { likePost } = require("../controller/likeController");

router.post("/:postId", likePost);

module.exports = router;
