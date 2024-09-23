import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"; // Import the cart slice

const store = configureStore({
  reducer: {
    cart: cartReducer, // Ensure this key matches the cart reducer's name
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
