import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipe/getRecipesByChef`,
          {
            withCredentials: true,
          }
        );
        const foundRecipe = response.data.find((r) => r._id === id);
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          setError("Recipe not found");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe. Please try again later.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/recipe/getCategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
      }
    };

    fetchRecipe();
    fetchCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleArrayChange = (e, index, arrayType, field) => {
    const { value } = e.target;
    setRecipe((prev) => {
      const updatedArray = prev[arrayType].map((item, idx) => {
        if (idx === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { ...prev, [arrayType]: updatedArray };
    });
  };

  const handleAddArrayItem = (arrayType) => {
    setRecipe((prev) => ({
      ...prev,
      [arrayType]: [...prev[arrayType], {}],
    }));
  };

  const handleRemoveArrayItem = (arrayType, index) => {
    setRecipe((prev) => ({
      ...prev,
      [arrayType]: prev[arrayType].filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/recipe/editRecipe/${id}`,
        recipe,
        {
          withCredentials: true,
        }
      );
      navigate("/recipeLists"); // Redirect to the list of recipes
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Failed to update recipe. Please try again.");
    }
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleArrayChange(e, index, "ingredients", "name")
                }
                placeholder="Ingredient name"
                className="mr-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="text"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleArrayChange(e, index, "ingredients", "quantity")
                }
                placeholder="Quantity"
                className="mr-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) =>
                  handleArrayChange(e, index, "ingredients", "unit")
                }
                placeholder="Unit"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("ingredients", index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem("ingredients")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Add Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions</label>
          {recipe.instructions.map((instruction, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={instruction.stepText}
                onChange={(e) =>
                  handleArrayChange(e, index, "instructions", "stepText")
                }
                placeholder="Instruction step"
                className="mr-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                type="text"
                value={instruction.stepImage}
                onChange={(e) =>
                  handleArrayChange(e, index, "instructions", "stepImage")
                }
                placeholder="Image URL"
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => handleRemoveArrayItem("instructions", index)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem("instructions")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            Add Instruction
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Photos (Enter URLs separated by commas)
          </label>
          <input
            type="text"
            name="photos"
            value={recipe.photos.join(",")}
            onChange={(e) =>
              setRecipe({ ...recipe, photos: e.target.value.split(",") })
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Servings</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={recipe.category}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
