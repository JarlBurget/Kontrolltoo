import React, { createContext, useState } from "react";

// Create the context with default values
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

// Export the provider component
export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCartHandler = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      // Copy the previous items array
      const updatedItems = [...prevItems];

      if (existingItemIndex !== -1) {
        // If item exists, increment its quantity
        const existingItem = {...updatedItems[existingItemIndex]};
        existingItem.quantity += 1;
        updatedItems[existingItemIndex] = existingItem;
        console.log(`Increased quantity of ${item.name} to ${existingItem.quantity}`);
        console.log(`Item details: ${item.description}`);
        console.log(`Image: ${item.image}`);
      } else {
        // If item doesn't exist, add it with Quantity of 1
        updatedItems.push({ ...item, quantity: 1 });
        console.log(`Added new item: ${item.name} with quantity 1`);
        console.log(`Item details: ${item.description}`);
        console.log(`Image: ${item.image}`);
      }

      console.log("Current cart:", updatedItems);
      return updatedItems;
    });
  };

  const removeItemFromCartHandler = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCartHandler = () => {
    setCartItems([]);
  };

  const contextValue = {
    items: cartItems,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Export the context as default
export default CartContext;