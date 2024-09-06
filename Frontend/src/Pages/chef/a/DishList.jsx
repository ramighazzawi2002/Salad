// DishList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DishList = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/dish/getDishesByChef",
        {
          withCredentials: true,
        }
      );
      setDishes(response.data.dishes);
    } catch (error) {
      console.error("Error fetching dishes:", error);
      setError("Failed to fetch dishes. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/dish/delete/${id}`, {
        withCredentials: true,
      });
      setDishes((prevDishes) => prevDishes.filter((dish) => dish._id !== id));
    } catch (error) {
      console.error("Error deleting dish:", error);
      setError("Failed to delete dish. Please try again.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-dish/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Dishes</h1>

      {error && <div className="text-red-500 text-center mb-6">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dishes.map((dish) => (
          <div
            key={dish._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {dish.photos && dish.photos.length > 0 && (
              <img
                src={dish.photos[0]}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{dish.name}</h2>
              <p className="text-gray-600 mb-2">{dish.description}</p>
              <p className="text-gray-800 font-bold mb-2">
                Price: ${dish.price.toFixed(2)}
              </p>
              <p className="text-gray-800 mb-2">
                Available Quantity: {dish.availableQuantity}
              </p>
              <p className="text-gray-800 mb-2">
                Cuisine Type: {dish.cuisineType || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Servings: {dish.servings || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Calories: {dish.nutrition?.calories || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Protein: {dish.nutrition?.protein || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Total Fats: {dish.nutrition?.totalFats || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Carbs: {dish.nutrition?.carbs || "N/A"}
              </p>
              <p className="text-gray-800 mb-2">
                Approval Status: {dish.isApproved ? "Approved" : "Pending"}
              </p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(dish._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dish._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DishList;
