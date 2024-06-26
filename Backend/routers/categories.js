const express = require("express");
const router = express.Router();

const { store, index, show, destroy } = require("../controllers/categories");

router.post("/", store);
router.get("/", index);
router.get("/:id", show);
router.delete("/:id", destroy);

module.exports = router;
