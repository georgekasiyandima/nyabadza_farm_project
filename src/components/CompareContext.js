import React, { createContext, useContext, useReducer } from 'react';

const CompareContext = createContext();

const initialState = {
  items: [], // { product }
};

function compareReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_COMPARE': {
      if (state.items.find(item => item.product.id === action.product.id)) {
        return state; // Already in compare
      }
      if (state.items.length >= 3) {
        return state; // Max 3 products
      }
      return {
        ...state,
        items: [...state.items, { product: action.product }],
      };
    }
    case 'REMOVE_FROM_COMPARE': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.productId),
      };
    }
    case 'CLEAR_COMPARE': {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

export function CompareProvider({ children }) {
  const [state, dispatch] = useReducer(compareReducer, initialState);

  const addToCompare = (product) => dispatch({ type: 'ADD_TO_COMPARE', product });
  const removeFromCompare = (productId) => dispatch({ type: 'REMOVE_FROM_COMPARE', productId });
  const clearCompare = () => dispatch({ type: 'CLEAR_COMPARE' });

  const value = {
    items: state.items,
    addToCompare,
    removeFromCompare,
    clearCompare,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  return useContext(CompareContext);
} 