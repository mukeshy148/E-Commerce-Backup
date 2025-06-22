// Import function to create the Redux store (big box for app data)
import { configureStore } from "@reduxjs/toolkit";

// Import reducer (rulebook for how to update cart data)
import CartReducer from './Reducer/CartReducer';

// Create the store and tell it to use CartReducer for the "cart" data
const store = configureStore({
  reducer: {
    cart: CartReducer , // Cart state managed by CartReducer rules
  },
});

// Export the store to use it in the app
export default store;



/* cart = []
user clicks "Add T-shirt"
↓
Redux dispatches "addToCart"
↓
Reducer runs "addToCart" logic
↓
cart = [ { id: 1, name: "T-shirt", quantity: 1 } ]
*/





/* 
Definitions:

// Store: The place where all app data is kept (like a big box)

// Reducer: The rulebook that tells how to change the data in the store

// createSlice: A helper to write reducers and actions together easily

// Action: A message telling the store what just happened (e.g., "add item")

// Provider: A wrapper that shares the store with your entire app
*/
