const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/user");

router.get("/:id", getUserProfile);

module.exports = router;
