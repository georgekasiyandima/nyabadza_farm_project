import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

const initialState = {
  items: [], // { product }
};

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existing = state.items.find(item => item.product.id === action.product.id);
      if (existing) {
        return state; // Already in wishlist
      }
      return {
        ...state,
        items: [...state.items, { product: action.product }],
      };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
      };
    }
    case 'CLEAR_WISHLIST': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const addToWishlist = (product) => dispatch({ type: 'ADD_TO_WISHLIST', product });
  const removeFromWishlist = (productId) => dispatch({ type: 'REMOVE_FROM_WISHLIST', productId });
  const clearWishlist = () => dispatch({ type: 'CLEAR_WISHLIST' });

  const value = {
    items: state.items,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  return useContext(WishlistContext);
} 