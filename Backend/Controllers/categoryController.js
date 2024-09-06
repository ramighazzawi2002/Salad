const categoryModel = require("../Models/categoryModel");

class CategoryController {
  // Method to add a new category
  async newCategory(req, res) {
    try {
      // Extract name and description from the request body
      const { name, description } = req.body;

      // Check if the category name already exists
      const existingCategory = await categoryModel.findOne({ name });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }

      // Create a new category object
      const category = new categoryModel({
        name,
        description,
      });

      // Save the category to the database
      await category.save();

      // Respond with the newly created category
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new CategoryController();
