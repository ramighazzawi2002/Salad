import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Utensils,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axios from "axios";

const DishesPage = () => {
  const [dishes, setDishes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDishes = async page => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/dishes/get?page=${page}&limit=5`
      );
      setDishes(
        response.data.dishes.map(dish => ({
          id: dish._id,
          name: dish.name,
          chef: dish.chef?.name || "Unknown",
          status: "pending",
          cuisine: dish.cuisineType,
          price: dish.price,
          photos: dish.photos || [],
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
    fetchDishes(currentPage);
  }, [currentPage]);

  const handleDish = async (id, approved) => {
    if (approved) {
      try {
        await axios.put(`http://localhost:3000/api/dishes/approve/${id}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.delete(`http://localhost:3000/api/dishes/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
    setDishes(prev => prev.filter(dish => dish.id !== id));
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
        <Utensils className="w-6 h-6 mr-2" />
        Dishes
      </h2>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {dishes.map(dish => (
              <div
                key={dish.id}
                className="bg-gray-50 rounded-lg shadow overflow-hidden"
              >
                <img
                  src={dish.photos[0] || "https://via.placeholder.com/300x200"}
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {dish.name}
                    </h3>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                        statusColors[dish.status]
                      }`}
                    >
                      <StatusIcon status={dish.status} />
                      <span>
                        {dish.status.charAt(0).toUpperCase() +
                          dish.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1" /> {dish.chef}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Cuisine: {dish.cuisine}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {dish.price}
                    </span>
                  </div>
                  {dish.status === "pending" && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleDish(dish.id, true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Approve
                      </button>
                      <button
                        onClick={() => handleDish(dish.id, false)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out flex items-center flex-1 justify-center"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> Disapprove
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

export default DishesPage;
