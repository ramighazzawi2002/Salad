import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function DishCard({ dish, openDetailsPopup }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={dish.photos[0]}
        alt={dish.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>

          <span className="text-green-600 font-bold">
            ${dish.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{dish.description}</p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => addToCart(dish)}
            className="bg-green-600 text-white py-1 px-3 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Add to Cart
          </button>
          <button
            onClick={() => openDetailsPopup(dish)}
            className=" text-green-600 font-bold py-1 px-3 rounded-lg hover:bg-green-100 transition duration-200"
          >
            View
          </button>
          <Link to={`/Dish-details/${dish._id}`}>
            <button
              onClick={() => openDetailsPopup(dish)}
              className=" text-green-600 font-bold py-1 px-3 rounded-lg hover:bg-green-100 transition duration-200"
            >
              View
            </button>
          </Link>
        </div>
      </div>{" "}
    </div>
  );
}

export default DishCard;
