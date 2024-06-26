const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  store,
  index,
  show,
  update,
  destroy,
} = require("../controllers/photos");
const validator = require("../middlewares/validator.js");
const { bodyData } = require("../validations/photos.js");
const { paramId } = require("../validations/generic.js");

router.post("/", upload.single("img"), validator(bodyData), store);
router.get("/", index);
router.get("/:id", validator(paramId), show);
router.put("/:id", upload.single("img"), validator(bodyData), update);
router.delete("/:id", validator(paramId), destroy);

module.exports = router;
