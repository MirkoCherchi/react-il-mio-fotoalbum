const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");
const upload = require("../middlewares/upload");
const validator = require("../middlewares/validator.js");
const { recBody, loginBody } = require("../validations/users.js");

router.post(
  "/register",
  upload.single("img_path"),
  validator(recBody),
  register
);

router.post("/login", validator(loginBody), login);

module.exports = router;
