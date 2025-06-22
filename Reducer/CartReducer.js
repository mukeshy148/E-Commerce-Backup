import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    // Adds new item if not in cart, else increases quantity
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        // Already Cart id === Trying to add cart ID
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeItem;
    },

    // Only increases quantity of an item already in cart
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },

    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity === 1) {
        itemPresent.quantity = 0;
        // If quantity is 0, remove item from cart
        const removeItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = removeItem;
      }
      else{
        itemPresent.quantity--;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart} = CartSlice.actions;

export default CartSlice.reducer;