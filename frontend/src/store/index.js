import { configureStore } from "@reduxjs/toolkit";

// Import reducers for authentication, products, and cart
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

// Configure the Redux store with the imported reducers
export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
