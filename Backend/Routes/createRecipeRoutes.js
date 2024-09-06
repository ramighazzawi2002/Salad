const express = require("express");
const router = express.Router();
const {
  newRecipe,
  getAllCategories,
  getRecipesByChef,
  editRecipe,
  deleteRecipe,
} = require("../Controllers/creatRecipeController");

// Create a new recipe
router.post("/create", newRecipe);

// Get all categories
router.get("/getCategories", getAllCategories);

// Get recipes by chef
router.get("/getRecipesByChef", getRecipesByChef);

// Edit a recipe
router.put("/editRecipe/:id", editRecipe);

// Soft delete a recipe
router.delete("/deleteRecipe/:id", deleteRecipe);

module.exports = router;
