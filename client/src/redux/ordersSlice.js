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

export const getOrdersApi = createAsyncThunk(
  "orders/getOrders",
  async ({ customerId, acesstoken }) => {
    try {
      const response = await fetch(`${apiEndPoints.orders}/${customerId}`, {
        headers: {
          Authorization: `Bearer ${acesstoken}`,
        },
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
  reducers: {
    resetOrders: (state) => {
      state.status = "fulfilled";
      state.error = null;
      state.orders = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createOrdersApi.fulfilled, (state, action) => {
        state.status = "fullfilled";
      })
      .addCase(createOrdersApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createOrdersApi.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getOrdersApi.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrdersApi.rejected, (state, action) => {
        state.status = "rejected";
        state.orders = [];
        state.error = action.payload;
      })
      .addCase(getOrdersApi.pending, (state, action) => {
        state.status = "pending";
        state.orders = [];
        state.error = null;
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
