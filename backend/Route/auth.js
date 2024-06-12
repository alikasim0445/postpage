// routes/auth.js

const express = require("express");

const { protect, authorize } = require("../middleware/auth");
const {
  signupUser,
  loginUser,
  getUserRoute,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", signupUser);

router.post("/login", loginUser);

router.get("/me", protect, getUserRoute);

module.exports = router;
