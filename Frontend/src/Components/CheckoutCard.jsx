import React, { useState } from "react";
import CheckoutPopup from "./CheckoutPopup";
import { useCart } from "../Context/CartContext";

function CheckoutCard() {
  const [showPopup, setShowPopup] = useState(false);
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-white shadow-lg h-screen sticky top-0 right-0 overflow-hidden flex flex-col">
      <div className="p-6 bg-green-600 text-white">
        <h2 className="text-2xl font-bold">Your Order</h2>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item._id}
                className="flex items-center space-x-4 pb-4 border-b"
              >
                <img
                  src={item.photos[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="bg-gray-200 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="bg-gray-200 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="p-6 bg-gray-100">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Checkout
        </button>
      </div>
      {showPopup && <CheckoutPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default CheckoutCard;
