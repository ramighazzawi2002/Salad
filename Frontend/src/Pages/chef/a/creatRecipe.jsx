import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeFormCreat = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    instructions: [""],
    cookingTime: "",
    category: "",
    photos: [""],
    dietaryRestrictions: [""],
    cuisineType: "",
    nutrition: {
      calories: "",
      protein: "",
      totalFats: "",
      carbs: "",
    },
    videoTutorialUrl: "",
    servings: "",
    isApproved: false,
  });

  const [categories, setCategories] = useState(null);
  const [chefId, setChefId] = useState("");

  useEffect(() => {
    // Fetch categories from the backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/recipe/getCategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", unit: "" },
      ],
    });
  };

  const handleRemoveIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData({ ...formData, instructions: newInstructions });
  };

  const handleAddInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  const handleRemoveInstruction = (index) => {
    setFormData({
      ...formData,
      instructions: formData.instructions.filter((_, i) => i !== index),
    });
  };

  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      nutrition: { ...formData.nutrition, [name]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare recipe data with the user_id as chef
      const recipeData = {
        ...formData,
        // chef: chefId, // Set chef to the user_id retrieved from cookies
        instructions: formData.instructions.map((instruction) => ({
          stepText: instruction,
        })),
        cookingTime: parseInt(formData.cookingTime),
        servings: parseInt(formData.servings),
      };

      console.log("Sending recipe data:", recipeData);

      // Perform the POST request
      const response = await axios.post(
        "http://localhost:3000/api/recipe/create",
        recipeData,
        { withCredentials: true } // Include cookies in the request
      );

      console.log("Response:", response.data);

      alert("Recipe added successfully!");
    } catch (error) {
      console.error(
        "There was an error adding the recipe!",
        error.response ? error.response.data : error
      );
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
                name="name"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                name="quantity"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                name="unit"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Instructions</h3>
          {formData.instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <textarea
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="flex-1 p-2 border rounded"
                rows="2"
              />
              <button
                type="button"
                onClick={() => handleRemoveInstruction(index)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddInstruction}
            className="mt-2 p-2 bg-green-500 text-white rounded"
          >
            Add Instruction
          </button>
        </div>

        {/* Cooking Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cooking Time (minutes):
          </label>
          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category:
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          >
            <option value="">Select a category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        {/* Photos */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Photos (comma-separated URLs):
          </label>
          <input
            type="text"
            name="photos"
            value={formData.photos.join(", ")}
            onChange={(e) =>
              setFormData({ ...formData, photos: e.target.value.split(", ") })
            }
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dietary Restrictions (comma-separated):
          </label>
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                dietaryRestrictions: e.target.value.split(", "),
              })
            }
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Cuisine Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cuisine Type:
          </label>
          <input
            type="text"
            name="cuisineType"
            value={formData.cuisineType}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Nutrition */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calories:
              </label>
              <input
                type="text"
                name="calories"
                value={formData.nutrition.calories}
                onChange={handleNutritionChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protein:
              </label>
              <input
                type="text"
                name="protein"
                value={formData.nutrition.protein}
                onChange={handleNutritionChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Fats:
              </label>
              <input
                type="text"
                name="totalFats"
                value={formData.nutrition.totalFats}
                onChange={handleNutritionChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Carbs:
              </label>
              <input
                type="text"
                name="carbs"
                value={formData.nutrition.carbs}
                onChange={handleNutritionChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
              />
            </div>
          </div>
        </div>

        {/* Video Tutorial URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video Tutorial URL:
          </label>
          <input
            type="url"
            name="videoTutorialUrl"
            value={formData.videoTutorialUrl}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Servings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Servings:
          </label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-2"
          />
        </div>

        {/* Approval */}
        {/* <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isApproved"
              checked={formData.isApproved}
              onChange={handleChange}
              className="mr-2"
            />
            Approved
          </label>
        </div> */}
        {/* Submit Button */}
        <button
          type="submit"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeFormCreat;
