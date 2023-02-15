const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const home = require("../controllers/home");

router.route("/").get(catchAsync(home.main));

module.exports = router;
