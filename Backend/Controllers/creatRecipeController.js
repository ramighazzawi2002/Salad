const Recipe = require("../Models/recipeModel");
const Category = require("../Models/categoryModel");
//this for create recipes
const newRecipe = async (req, res) => {
  try {
    const chef = req.cookies.user_id;
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      category,
      photos,
      dietaryRestrictions,
      cuisineType,
      nutrition,
      videoTutorialUrl,
      servings,
      isApproved,
    } = req.body;

    const cookingTimeNumber = parseInt(cookingTime);
    const servingsNumber = parseInt(servings);

    if (isNaN(cookingTimeNumber) || isNaN(servingsNumber)) {
      return res.status(400).json({
        message: "Invalid cookingTime or servings. Must be numbers.",
      });
    }

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      cookingTime: cookingTimeNumber,
      category,
      chef,
      photos,
      dietaryRestrictions,
      cuisineType,
      nutrition,
      videoTutorialUrl,
      servings: servingsNumber,
      isApproved,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json({
      message: "Recipe created successfully",
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error("Error creating recipe:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      message: "Error creating recipe",
      error: error.message,
    });
  }
};
//this for create recipes
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// This function handles fetching recipes based on the user_id stored in cookies
const getRecipesByChef = async (req, res) => {
  try {
    const chefId = req.cookies.user_id;
    if (!chefId) {
      return res.status(400).json({
        message: "User ID not found in cookies",
      });
    }

    // Fetch recipes created by the chef (user_id)
    const recipes = await Recipe.find({ chef: chefId, isDeleted: false });

    if (recipes.length === 0) {
      return res.status(404).json({
        message: "No recipes found for this chef",
      });
    }

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      message: "Error fetching recipes",
      error: error.message,
    });
  }
};

// Edit a recipe
const editRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const {
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      category,
      photos,
      dietaryRestrictions,
      cuisineType,
      nutrition,
      videoTutorialUrl,
      servings,
      isApproved,
    } = req.body;

    const cookingTimeNumber = parseInt(cookingTime);
    const servingsNumber = parseInt(servings);

    if (isNaN(cookingTimeNumber) || isNaN(servingsNumber)) {
      return res.status(400).json({
        message: "Invalid cookingTime or servings. Must be numbers.",
      });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        title,
        description,
        ingredients,
        instructions,
        cookingTime: cookingTimeNumber,
        category,
        photos,
        dietaryRestrictions,
        cuisineType,
        nutrition,
        videoTutorialUrl,
        servings: servingsNumber,
        isApproved,
      },
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating recipe",
      error: error.message,
    });
  }
};

// Soft delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const deletedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedRecipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.json({
      message: "Recipe deleted successfully",
      recipe: deletedRecipe,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting recipe",
      error: error.message,
    });
  }
};

module.exports = {
  newRecipe,
  getAllCategories,
  getRecipesByChef,
  editRecipe,
  deleteRecipe,
};
