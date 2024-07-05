const express = require("express");
const router = express.Router();

const {
  store,
  index,
  show,
  destroy,
  getPhotosByCategory,
} = require("../controllers/categories");

router.post("/", store);
router.get("/", index);
router.get("/:id", show);
router.delete("/:id", destroy);
router.get("/:categoryId/photos", getPhotosByCategory);

module.exports = router;
