const Recipe = require("../Models/recipeModel"); // تأكد من المسار الصحيح

const mongoose = require("mongoose");
const Category = require("../Models/categoryModel");

class RecipeController {
  async getAllRecipesFalseApprove(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalRecipes = await Recipe.countDocuments({
        isApproved: false,
        isDeleted: false,
      });

      const recipes = await Recipe.find({
        isApproved: false,
        isDeleted: false,
      })
        .populate("chef")
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        recipes,
        currentPage: page,
        totalPages: Math.ceil(totalRecipes / limit),
        totalRecipes,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllRecipes(req, res) {
    try {
      const userId = req.user;
      console.log("iddd", userId);
      console.log("hello");

      const recipes = await Recipe.find();
      if (!recipes) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  //fillter
  // exports.getfillter = async (req, res) => {
  //   try {
  //     const { category, tags } = req.query;

  //     // إعداد استعلام التصفية
  //     let query = {};

  //     // التصفية حسب الفئة إذا كانت موجودة
  //     if (category) {
  //       query.category = category;
  //     }

  //     // التصفية حسب العلامات إذا كانت موجودة
  //     if (tags) {
  //       query.tags = { $in: tags.split(',') };
  //     }

  //     const fillter = await Recipe.find(query,{ isDeleted: false });
  //     res.status(200).json(fillter);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };

  // في ملف recipeController.js

  // exports.getfillter = async (req, res) => {
  //   try {
  //     const { category } = req.query;

  //     let query = {};
  async getRecipeById(req, res) {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Error fetching recipe details", error });
    }
  }

  //     if (category) {

  //       query.category = mongoose.Types.ObjectId(category);
  //     }

  //     const fillter = await Recipe.find(query).where('isDeleted').equals(false);
  //     res.status(200).json(fillter);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  // exports.getfillter = async (req, res) => {
  //   try {
  //     const { category } = req.query;

  //     let query = {};

  //     if (category) {

  //       query.category = mongoose.Types.ObjectId(category);
  //     }

  //     const fillter = await Recipe.find(query).where('isDeleted').equals(false);
  //     res.status(200).json(fillter);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // };
  async getfillter(req, res) {
    try {
      const { category } = req.query;

      let query = {};

      if (category) {
        query.category = new mongoose.Types.ObjectId(category);
      }

      const fillter = await Recipe.find(query).where("isDeleted").equals(false);
      res.status(200).json(fillter);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async editRecipe(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedRecipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      res.status(200).json({
        message: "Recipe updated successfully",
        recipe: updatedRecipe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating recipe",
        error: error.message,
      });
    }
  }

  async approveRecipe(req, res) {
    try {
      const { id } = req.params;

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { isApproved: true },
        { new: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      res.status(200).json({
        message: "Recipe approved successfully",
        recipe: updatedRecipe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error approving recipe",
        error: error.message,
      });
    }
  }

  async softDelete(req, res) {
    try {
      const { id } = req.params;
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({
          message: "Recipe not found",
        });
      }

      res.status(200).json({
        message: "Recipe soft deleted successfully",
        recipe: updatedRecipe,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting recipe",
        error: error.message,
      });
    }
  }
  //get category
  async getCategories(req, res) {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async allPendingRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ isApproved: false }).countDocuments();
      res.status(200).json({ recipes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new RecipeController();
