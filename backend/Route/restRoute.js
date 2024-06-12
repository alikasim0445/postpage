const express = require("express");

const router = express.Router();
const forgotController = require("../controller/forgotController");

router.post("/:token", forgotController.restPassword);

module.exports = router;
