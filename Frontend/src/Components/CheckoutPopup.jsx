import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";

function CheckoutPopup({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { cart, chefId } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        status: "pending",
        totalAmount: total,
        chef: chefId,
        dishes: cart.map((item) => ({
          dish: item._id,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "State",
          zipCode: "12345",
          country: "Country",
        },
        deliveryMethod: "delivery",
      };

      const response = await axios.post(
        "http://localhost:3000/api/orders",
        orderData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        setSuccess(true);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err) {
      setError(err.message || "An error occurred while placing the order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="space-y-4 mb-4">
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-t pt-4 mb-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">Order placed successfully!</p>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-200 mr-2"
            disabled={isLoading}
          >
            Close
          </button>
          <button
            onClick={handleConfirmOrder}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
            disabled={isLoading || success}
          >
            {isLoading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>{" "}
    </div>
  );
}

export default CheckoutPopup;
