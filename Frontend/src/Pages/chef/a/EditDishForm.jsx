import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditDishForm = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [dish, setDish] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/dish/getDishesByChef",
          {
            withCredentials: true,
          }
        );

        if (Array.isArray(response.data.dishes)) {
          const foundDish = response.data.dishes.find((d) => d._id === id);
          if (foundDish) {
            setDish(foundDish);
          } else {
            setError("Dish not found");
          }
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching dish:", error);
        setError("Failed to fetch dish. Please try again later.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/recipe/getCategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
      }
    };

    fetchDish();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("nutrition.")) {
      const nutritionField = name.split(".")[1];
      setDish((prev) => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [nutritionField]: value,
        },
      }));
    } else if (name === "photos") {
      // Handle URL input for photos
      setDish((prev) => ({ ...prev, photos: value.split(",") }));
    } else {
      setDish((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the category ID from the name
      const selectedCategory = categories.find(
        (cat) => cat.name === dish.category
      );
      const updatedDish = {
        ...dish,
        category: selectedCategory ? selectedCategory._id : null,
      };

      await axios.put(
        `http://localhost:3000/api/dish/update/${id}`,
        updatedDish,
        {
          withCredentials: true,
        }
      );
      alert("Dish updated successfully!");
      navigate(`/dishList`); // Navigate to the dish details page after update
    } catch (error) {
      console.error("Error updating dish:", error);
      setError("Error updating dish. Please try again.");
    }
  };

  if (!dish) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-8 p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Dish</h2>

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
          value={dish.name}
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
          value={dish.description}
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
          value={dish.price}
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
          value={dish.availableQuantity}
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
          value={dish.category}
          onChange={(e) =>
            handleChange({
              target: { name: "category", value: e.target.value },
            })
          }
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
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
          value={dish.cuisineType}
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
            value={dish.nutrition.calories}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.protein"
            placeholder="Protein"
            value={dish.nutrition.protein}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.totalFats"
            placeholder="Total Fats"
            value={dish.nutrition.totalFats}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            name="nutrition.carbs"
            placeholder="Carbs"
            value={dish.nutrition.carbs}
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
          value={dish.servings}
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
          value={dish.photos.join(",")}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Dish
      </button>
    </form>
  );
};

export default EditDishForm;
