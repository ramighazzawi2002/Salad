import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/recipe/getRecipesByChef",
        {
          withCredentials: true,
        }
      );

      if (response.data.length === 0) {
        setError("No recipes found.");
      } else {
        setRecipes(response.data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again later.");
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/recipe/deleteRecipe/${recipeId}`,
        { withCredentials: true }
      );
      setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Recipes
      </h2>

      {error && (
        <p className="text-red-500 text-xs italic mb-4 text-center">{error}</p>
      )}

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              {recipe.photos.length > 0 && (
                <img
                  src={recipe.photos[0]}
                  alt={recipe.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 mt-2">{recipe.description}</p>

                {/* Ingredients */}
                {recipe.ingredients.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700">
                      Ingredients:
                    </h4>
                    <ul className="list-disc list-inside text-gray-600">
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.name} - {ingredient.quantity}{" "}
                          {ingredient.unit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Instructions */}
                {recipe.instructions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700">
                      Instructions:
                    </h4>
                    <ol className="list-decimal list-inside text-gray-600">
                      {recipe.instructions.map((instruction, index) => (
                        <li key={index}>
                          {instruction.stepText}
                          {instruction.stepImage && (
                            <img
                              src={instruction.stepImage}
                              alt={`Step ${index + 1}`}
                              className="w-full h-32 object-cover mt-2"
                            />
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Additional Information */}
                <div className="mt-4">
                  {recipe.cuisineType && (
                    <p className="text-gray-800">
                      <strong>Cuisine Type:</strong> {recipe.cuisineType}
                    </p>
                  )}
                  {recipe.dietaryRestrictions.length > 0 && (
                    <p className="text-gray-800">
                      <strong>Dietary Restrictions:</strong>{" "}
                      {recipe.dietaryRestrictions.join(", ")}
                    </p>
                  )}
                  {recipe.nutrition && (
                    <div>
                      <p className="text-gray-800">
                        <strong>Nutrition:</strong>
                      </p>
                      <p className="text-gray-800">
                        <strong>Calories:</strong> {recipe.nutrition.calories}
                      </p>
                      <p className="text-gray-800">
                        <strong>Protein:</strong> {recipe.nutrition.protein}
                      </p>
                      <p className="text-gray-800">
                        <strong>Total Fats:</strong>{" "}
                        {recipe.nutrition.totalFats}
                      </p>
                      <p className="text-gray-800">
                        <strong>Carbs:</strong> {recipe.nutrition.carbs}
                      </p>
                    </div>
                  )}
                  {recipe.videoTutorialUrl && (
                    <p className="mt-2 text-blue-500">
                      <a
                        href={recipe.videoTutorialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch Video Tutorial
                      </a>
                    </p>
                  )}
                  <p className="text-gray-800 mt-2">
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                  </p>
                  <p className="text-gray-800">
                    <strong>Servings:</strong> {recipe.servings}
                  </p>
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/edit-recipe/${recipe._id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipesList;
