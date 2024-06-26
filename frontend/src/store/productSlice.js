import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      throw Error("Error fetching products");
    }
  }
);

// Create a slice for products
const productSlice = createSlice({
  name: "products", // Name of the slice
  initialState: {
    items: [],
    status: "idle", // Can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  }, // Initial state
  reducers: {},
  extraReducers: (builder) => {
    // Handle different states of the fetchProducts async thunk

    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer to be used in the store configuration
export default productSlice.reducer;
