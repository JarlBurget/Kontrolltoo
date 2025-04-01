import React, { createContext, useReducer, useContext } from "react";

const initialCartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0
};

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  totalItems: 0,
  addItem: (item) => {},
  removeItem: (id, amount = 1) => {},
  clearCart: () => {},
  isItemInCart: (id) => false
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      let updatedItems;
      
      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.item, quantity: 1 }];
      }
      
      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        items: updatedItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount
      };
    }

    case 'REMOVE_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      
      if (existingItemIndex === -1) {
        return state;
      }
      
      const existingItem = state.items[existingItemIndex];
      const amount = action.amount || 1;
      
      let updatedItems;
      
      if (existingItem.quantity <= amount) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        updatedItems = state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - amount }
            : item
        );
      }
      
      const newTotalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        items: updatedItems,
        totalItems: newTotalItems,
        totalAmount: newTotalAmount
      };
    }

    case 'CLEAR_CART':
      return initialCartState;
      
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialCartState);

  const addItemToCartHandler = (item) => {
    if (!item.price) {
      console.warn('Item added to cart is missing price property:', item);
      item.price = 0;
    }
    dispatchCartAction({ type: 'ADD_ITEM', item });
  };

  const removeItemFromCartHandler = (id, amount = 1) => {
    dispatchCartAction({ type: 'REMOVE_ITEM', id, amount });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR_CART' });
  };
  
  const isItemInCartHandler = (id) => {
    return cartState.items.some(item => item.id === id);
  };

  const contextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    totalItems: cartState.totalItems,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    isItemInCart: isItemInCartHandler
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartContextProvider');
  }
  
  return context;
};

export default CartContext;