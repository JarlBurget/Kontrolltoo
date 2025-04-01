import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

const cartReducer = (state, action) => {
  if (action.type === 'ADD_ITEM') {
    const existingItemIndex = state.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state];

    if (existingItemIndex !== -1) {
      const updatedItem = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      
      updatedItems[existingItemIndex] = updatedItem;
      
      console.log(`Increased quantity of ${action.item.name} to ${updatedItem.quantity}`);
      console.log(`Item details: ${action.item.description}`);
      console.log(`Image: ${action.item.image}`);
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
      
      console.log(`Added new item: ${action.item.name} with quantity 1`);
      console.log(`Item details: ${action.item.description}`);
      console.log(`Image: ${action.item.image}`);
    }

    console.log("Current cart:", updatedItems);
    return updatedItems;
  }

  if (action.type === 'REMOVE_ITEM') {
    return state.filter(item => item.id !== action.id);
  }

  if (action.type === 'CLEAR_CART') {
    return [];
  }

  return state;
};

export const CartContextProvider = ({ children }) => {
  const [cartItems, dispatchCartAction] = useReducer(cartReducer, []);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD_ITEM', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
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

export default CartContext;