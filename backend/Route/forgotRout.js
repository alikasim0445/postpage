const express = require("express");

const router = express.Router();
const forgotController = require("../controller/forgotController");

router.post("/", forgotController.forgetPassword);
router.post("/", forgotController.restPassword);

module.exports = router;
