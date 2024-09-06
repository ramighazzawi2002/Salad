import React, { useState, useEffect } from "react";
import {
  Book,
  User,
  Clock,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async page => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/recipes/get-approved-false?page=${page}&limit=5`
      );
      setRecipes(
        response.data.recipes.map(recipe => ({
          id: recipe._id,
          name: recipe.title,
          author: recipe.chef?.name || "Unknown",
          status: "pending",
          cuisine: recipe.cuisineType,
          cookTime: recipe.cookingTime + " minutes",
          photos: recipe.photos,
        }))
      );
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipes(currentPage);
  }, [currentPage]);

  const handleRecipe = async (id, approved) => {
    if (approved) {
      try {
        await axios.put(`http://localhost:3000/api/recipes/approve/${id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.delete(`http://localhost:3000/api/recipes/${id}`);
      } catch (error) {
        console.error(error);
      }
    }

    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    disapproved: "bg-red-100 text-red-800",
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "disapproved":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Book className="w-6 h-6 mr-2" />
        Recipes
      </h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={
                    recipe.photos?.[0] || "https://via.placeholder.com/640x360"
                  }
                  alt={recipe.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {recipe.name}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                        statusColors[recipe.status]
                      }`}
                    >
                      <StatusIcon status={recipe.status} />
                      <span>
                        {recipe.status.charAt(0).toUpperCase() +
                          recipe.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1" /> {recipe.author}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Cuisine: {recipe.cuisine}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" /> {recipe.cookTime}
                    </span>
                  </div>
                  {recipe.status === "pending" && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleRecipe(recipe.id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </button>
                      <button
                        onClick={() => handleRecipe(recipe.id, false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipesPage;
