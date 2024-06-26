import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunks for cart operations

// Fetch the cart items for the logged-in user
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get("/api/cart", {
      headers: { Authorization: auth.token },
    });
    return response.data;
  }
);

// Add a product to the cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { getState }) => {
    const { auth } = getState();
    const response = await axios.post("/api/cart", product, {
      headers: { Authorization: auth.token },
    });
    return response.data;
  }
);

// Remove a product from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { getState }) => {
    const { auth } = getState();
    await axios.delete(`/api/cart/${id}`, {
      headers: { Authorization: auth.token },
    });
    return id;
  }
);

// Create a slice for cart
const cartSlice = createSlice({
  name: "cart", // Name of the slice
  initialState: { items: [], status: "idle", error: null }, // Initial state
  reducers: {},
  extraReducers: (builder) => {
    // Handle different states of the async thunks
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload.products;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

// Export the reducer to be used in the store configuration
export default cartSlice.reducer;
