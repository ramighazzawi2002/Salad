import React, { useState, useEffect } from "react";
import axios from "axios";

const DishCreationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    availableQuantity: "",
    category: "",
    cuisineType: "",
    nutrition: {
      calories: "",
      protein: "",
      totalFats: "",
      carbs: "",
    },
    servings: "",
    photos: [], // Change to store URLs instead of file objects
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/recipe/getCategories"
      );
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (typeof response.data === "object" && response.data !== null) {
        setCategories(response.data.categories || []);
      } else {
        setCategories([]);
        setError("Unexpected data format for categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to fetch categories. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("nutrition.")) {
      const nutritionField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [nutritionField]: value,
        },
      }));
    } else if (name === "photos") {
      // Handle URL input for photos
      setFormData((prev) => ({ ...prev, photos: value.split(",") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const chefId = localStorage.getItem("id"); // Get chef ID from local storage

    try {
      const response = await axios.post(
        "http://localhost:3000/api/dish/create",
        { ...formData },
        { withCredentials: true }
      );
      console.log("Dish created successfully:", response.data);
      alert("Dish created successfully!");
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        availableQuantity: "",
        category: "",
        cuisineType: "",
        nutrition: {
          calories: "",
          protein: "",
          totalFats: "",
          carbs: "",
        },
        servings: "",
        photos: [],
      });
    } catch (error) {
      console.error("Error creating dish:", error);
      setError("Error creating dish. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Dish</h2>

      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="price"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="availableQuantity"
        >
          Available Quantity
        </label>
        <input
          type="number"
          id="availableQuantity"
          name="availableQuantity"
          value={formData.availableQuantity}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="category"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="cuisineType"
        >
          Cuisine Type
        </label>
        <input
          type="text"
          id="cuisineType"
          name="cuisineType"
          value={formData.cuisineType}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nutrition
        </label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="nutrition.calories"
            placeholder="Calories"
            value={formData.nutrition.calories}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.protein"
            placeholder="Protein"
            value={formData.nutrition.protein}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.totalFats"
            placeholder="Total Fats"
            value={formData.nutrition.totalFats}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.carbs"
            placeholder="Carbs"
            value={formData.nutrition.carbs}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="servings"
        >
          Servings
        </label>
        <input
          type="number"
          id="servings"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photos"
        >
          Photos (Enter URLs separated by commas)
        </label>
        <input
          type="text"
          id="photos"
          name="photos"
          value={formData.photos.join(",")}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Dish
      </button>
    </form>
  );
};

export default DishCreationForm;
