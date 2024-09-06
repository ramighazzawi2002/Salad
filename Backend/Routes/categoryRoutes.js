const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");

// POST /categories - Create a new category
router.post("/", categoryController.newCategory);

module.exports = router;
