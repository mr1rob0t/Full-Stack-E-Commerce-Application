import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch orders from the server
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { getState }) => {
    // Get the authentication token from the state
    const { auth } = getState();
    // Make a GET request to fetch orders with the auth token in headers
    const response = await axios.get("/api/orders", {
      headers: { Authorization: `Bearer ${auth.user.token}` },
    });
    // Return the fetched orders data
    return response.data;
  }
);

// Async thunk to create a new order
export const createNewOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState }) => {
    // Get the authentication token from the state
    const { auth } = getState();
    // Make a POST request to create a new order with the auth token in headers
    const response = await axios.post("/api/orders", orderData, {
      headers: { Authorization: `Bearer ${auth.user.token}` },
    });
    // Return the created order data
    return response.data;
  }
);

// Create a slice for orders with initial state, reducers, and extra reducers
const orderSlice = createSlice({
  name: "orders",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        // Set the status to loading when fetching orders
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        // Set the status to succeeded and store fetched orders
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        // Set the status to failed and store error message
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        // Add the newly created order to the items array
        state.items.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
