import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [], // { product, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(item => item.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', product });
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE_FROM_CART', productId });
  const updateQuantity = (productId, quantity) => dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
} 