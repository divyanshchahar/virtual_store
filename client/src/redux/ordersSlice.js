import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const createOrdersApi = createAsyncThunk(
  "orders/fetchOrders",
  async ({ orderData, acesstoken }) => {
    try {
      const response = await fetch(apiEndPoints.orders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acesstoken}`,
        },
        body: JSON.stringify(orderData),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      return e.message;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOrdersApi.fulfilled, (state, action) => {
        state.status = "sucess";
      })
      .addCase(createOrdersApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createOrdersApi.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default ordersSlice.reducer;
