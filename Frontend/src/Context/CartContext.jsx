import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [chefId, setChefId] = useState(null);

  const addToCart = (dish) => {
    const existingItem = cart.find((item) => item._id === dish._id);
    if (existingItem) {
      updateQuantity(dish._id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        chefId,
        setChefId,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
