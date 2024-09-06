// routes/dishesRouter.js
const express = require("express");
const router = express.Router();
const dishController = require("../Controllers/createDishController");

// Route to create a new dish
router.post("/create", dishController.createDish);

// Route to get all dishes for a specific chef
router.get("/getDishesByChef", dishController.getDishesByChef);

// Route to update a dish
router.put("/update/:id", dishController.updateDish);

// Route to soft-delete a dish
router.delete("/delete/:id", dishController.softDeleteDish);

module.exports = router;
