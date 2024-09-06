// Controllers/dishController.js
const dishModel = require("../Models/dishModel");
const userModel = require("../Models/userModel");

class DishController {
  async createDish(req, res) {
    try {
      const chef = req.cookies.user_id;
      const {
        name,
        description,
        price,
        photos,
        availableQuantity,
        category,
        dietaryRestrictions,
        cuisineType,
        nutrition,
        servings,
      } = req.body;

      // Validate that photos is an array of URLs
      if (!Array.isArray(photos)) {
        return res.status(400).json({
          message: "Photos must be an array of URLs",
        });
      }

      const newDish = new dishModel({
        name,
        description,
        price,
        photos,
        availableQuantity,
        category,
        chef,
        dietaryRestrictions,
        cuisineType,
        nutrition,
        servings,
      });

      await newDish.save();

      res.status(201).json({
        message: "Dish created successfully",
        dish: newDish,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating dish",
        error: error.message,
      });
    }
  }

  async getDishesByChef(req, res) {
    try {
      const chef = req.cookies.user_id;

      // Find all dishes that are not deleted and belong to the chef
      const dishes = await dishModel.find({
        chef,
        isDeleted: false,
      });

      res.status(200).json({
        dishes,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving dishes",
        error: error.message,
      });
    }
  }

  async updateDish(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        price,
        photos,
        availableQuantity,
        category,
        dietaryRestrictions,
        cuisineType,
        nutrition,
        servings,
      } = req.body;
      const chef = req.cookies.user_id;

      // Find the dish by ID and update it
      const updatedDish = await dishModel.findOneAndUpdate(
        { _id: id, chef },
        {
          name,
          description,
          price,
          photos,
          availableQuantity,
          category,
          chef,
          dietaryRestrictions,
          cuisineType,
          nutrition,
          servings,
        },
        { new: true }
      );

      if (!updatedDish) {
        return res.status(404).json({
          message:
            "Dish not found or you do not have permission to update this dish",
        });
      }

      res.status(200).json({
        message: "Dish updated successfully",
        dish: updatedDish,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating dish",
        error: error.message,
      });
    }
  }
  async softDeleteDish(req, res) {
    try {
      const { id } = req.params;

      // Find the dish by ID and mark it as deleted
      const updatedDish = await dishModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      if (!updatedDish) {
        return res.status(404).json({
          message: "Dish not found",
        });
      }

      res.status(200).json({
        message: "Dish soft-deleted successfully",
        dish: updatedDish,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error soft-deleting dish",
        error: error.message,
      });
    }
  }

  async getAllDishesWhereIsApprovedFalse(req, res) {
    try {
      const dishes = await dishModel.find({ isApproved: false });
      res.status(200).json({ dishes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Method to get dishes by user ID
  async getDishesByChefId(req, res) {
    try {
      const { chefId } = req.params;
      const dishes = await dishModel.find({
        chef: chefId,
        isDeleted: false,
      });
      if (!dishes.length) {
        return res
          .status(404)
          .json({ message: "No dishes found for this chef" });
      }
      res.status(200).json(dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error.message);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching dishes" });
    }
  }

  // Metod to GET details of a specific dish by ID
  async getDishById(req, res) {
    try {
      const dish = await dishModel.findById(req.params.id);
      if (!dish) {
        return res.status(404).json({ message: "Dish not found" });
      }
      res.status(200).json(dish);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the dish details" });
    }
  }
}

module.exports = new DishController();
