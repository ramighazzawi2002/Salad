import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  X,
  Star,
  User,
  Calendar,
  Book,
  Flag,
  MessageSquare,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";

const ItemDetails = ({ itemType, itemId, onClose }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        let endpoint;
        switch (itemType) {
          case "Recipe":
            endpoint = `http://localhost:3000/api/recipes/get/${itemId}`;
            break;
          case "Dish":
            endpoint = `http://localhost:3000/api/dishes/${itemId}`;
            break;
          case "Review":
            endpoint = `http://localhost:3000/api/reviews/reviews/get-by-id/${itemId}`;
            break;
          default:
            throw new Error("Invalid item type");
        }
        const response = await axios.get(endpoint);
        setItemDetails(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [itemType, itemId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const renderItemContent = () => {
    switch (itemType) {
      case "Recipe":
        return <RecipeDetails recipe={itemDetails} />;
      case "Dish":
        return <DishDetails dish={itemDetails} />;
      case "Review":
        return <ReviewDetails review={itemDetails} />;
      default:
        return <div className="text-gray-600">No details available</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ItemTypeIcon itemType={itemType} />
            <h2 className="text-2xl font-bold text-gray-800 ml-2">
              {itemType} Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {renderItemContent()}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-32">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="text-center text-red-500 p-4 bg-red-100 rounded-lg">
    <p className="font-semibold">Error:</p>
    <p>{message}</p>
  </div>
);

const ItemTypeIcon = ({ itemType }) => {
  const iconClass = "w-8 h-8";
  switch (itemType) {
    case "Recipe":
      return <Book className={`${iconClass} text-purple-500`} />;
    case "Dish":
      return <Flag className={`${iconClass} text-red-500`} />;
    case "Review":
      return <MessageSquare className={`${iconClass} text-blue-500`} />;
    default:
      return null;
  }
};

const RecipeDetails = ({ recipe }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
    <p className="text-gray-600">{recipe.description}</p>
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2 text-gray-400" />
        <span>Cook: {recipe.cookingTime} mins</span>
      </div>
      <div className="flex items-center">
        <Users className="w-4 h-4 mr-2 text-gray-400" />
        <span>Servings: {recipe.servings}</span>
      </div>
    </div>
  </div>
);

const DishDetails = ({ dish }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-gray-800">{dish.name}</h3>
    <p className="text-gray-600">{dish.description}</p>
    <div className="flex items-center text-lg font-semibold text-green-600">
      <DollarSign className="w-5 h-5 mr-1" />
      <span>{dish.price.toFixed(2)}</span>
    </div>
  </div>
);

const ReviewDetails = ({ review }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <User className="w-5 h-5 mr-2 text-gray-500" />
        <span className="font-semibold text-gray-800">
          {review.user?.name || "Unknown"}
        </span>
      </div>
      <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
        <Star className="w-4 h-4 mr-1 text-yellow-500" />
        <span className="font-medium text-yellow-700">{review.rating}</span>
      </div>
    </div>
    <p className="text-gray-600 italic">"{review.comment}"</p>
    <div className="text-sm text-gray-500 flex items-center">
      <Calendar className="w-4 h-4 mr-1" />
      <span>
        {new Date(review.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
    </div>
  </div>
);

export default ItemDetails;
