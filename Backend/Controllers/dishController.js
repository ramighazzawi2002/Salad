const dishModel = require("../Models/dishModel");
const userModel = require("../Models/userModel");

class DishController {
  async getAllDisheFalseApprove(req, res) {
    try {
      const dishes = await dishModel
        .find({
          isApproved: false,
          isDeleted: false,
        })
        .populate("chef");
      res.status(200).json({ dishes });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async approveDish(req, res) {
    try {
      const { id } = req.params;

      const updatedDish = await dishModel.findByIdAndUpdate(
        id,
        { isApproved: true },
        { new: true }
      );

      if (!updatedDish) {
        return res.status(404).json({
          message: "Dish not found",
        });
      }

      res.status(200).json({
        message: "Dish approved successfully",
        dish: updatedDish,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error approving dish",
        error: error.message,
      });
    }
  }

  // Method to create dish
  async createDish(req, res) {
    try {
      const {
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
      } = req.body;

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

  // Method to edit an existing dish
  async editDish(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedDish = await dishModel.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

      if (!updatedDish) {
        return res.status(404).json({
          message: "Dish not found",
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

  // Method to delete an existing dish
  async deleteDish(req, res) {
    try {
      const { id } = req.params;
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
        message: "Dish soft deleted successfully",
        dish: updatedDish,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting dish",
        error: error.message,
      });
    }
  }

  async getAllDishesWhereIsApprovedFalse(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalDishes = await dishModel.countDocuments({ isApproved: false });

      const dishes = await dishModel
        .find({ isApproved: false })
        .populate("chef", "name")
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        dishes,
        currentPage: page,
        totalPages: Math.ceil(totalDishes / limit),
        totalDishes,
      });
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
