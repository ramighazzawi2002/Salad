// const express = require("express");
// const router = express.Router();
// const RecipeController = require("../Controllers/recipeController");
// const {
//   newRecipe,
//   getAllCategories,
// } = require("../Controllers/creatRecipeController");
// const auth = require("../Middleware/auth");
// router.get("/get/:id", RecipeController.getRecipeById);
// router.get("/getAll", RecipeController.getAllRecipes);

// router.get("/getfillter", RecipeController.getfillter);
// router.get("/get-approved-false", RecipeController.getAllRecipesFalseApprove);

// // Route to create a new recipe
// router.post("/create", auth, newRecipe);
// router.get("/categories", getAllCategories);
// // Route to update an existing recipe
// router.put("/:id", RecipeController.editRecipe);

// // Route to soft delete a recipe by ID
// router.delete("/:id", RecipeController.softDelete);
// // get category
// router.get("/categories", RecipeController.getCategories);

// // change the status of the recipe to approved
// router.put("/approve/:id", RecipeController.approveRecipe);

// module.exports = router;
const express = require("express");
const router = express.Router();
const RecipeController = require("../Controllers/recipeController");

const auth = require("./../Middleware/auth");
router.get("/get/:id", RecipeController.getRecipeById);
router.get("/getAll", auth, RecipeController.getAllRecipes);
router.get("/getfillter", RecipeController.getfillter);
router.get("/get-approved-false", RecipeController.getAllRecipesFalseApprove);
// Route to create a new recipe
// router.post("/", RecipeController.newRecipe);

// Route to update an existing recipe
router.put("/:id", RecipeController.editRecipe);

// Route to soft delete a recipe by ID
router.delete("/:id", RecipeController.softDelete);

// get category
router.get("/categories", RecipeController.getCategories);
// change the status of the recipe to approved
router.put("/approve/:id", RecipeController.approveRecipe);

router.get("/all-pending-recipes", RecipeController.allPendingRecipes);

module.exports = router;
