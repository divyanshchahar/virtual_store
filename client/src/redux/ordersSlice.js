import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const ordersPostRequest = createAsyncThunk(
  "orders/ordersPostRequest",
  async ({ acessToken, orderData }) => {
    try {
      const response = await fetch(apiEndPoints.orders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

export const ordersGetRequest = createAsyncThunk(
  "orders/ordersGetRequest",
  async ({ acessToken, customerId }) => {
    try {
      const response = await fetch(`${apiEndPoints.orders}/${customerId}`, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
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
      // postRequest
      .addCase(ordersPostRequest.pending, (state, action) => {
        state.status = "pending";
        state.orders = [];
        state.error = null;
      })
      .addCase(ordersPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.orders = [];
          state.status = "failed";
          state.error = action.payload.body;
        } else {
          state.orders = action.payload.body;
          state.status = "sucess";
          state.error = null;
        }
      })
      .addCase(ordersPostRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.orders = [];
        state.error = action.payload.body;
      })
      // getRequest
      .addCase(ordersGetRequest.pending, (state, action) => {
        state.status = "pending";
        state.orders = [];
        state.error = null;
      })
      .addCase(ordersGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.orders = [];
          state.status = "failed";
          state.error = action.payload.body;
        } else {
          state.orders = action.payload.body;
          state.status = "sucess";
          state.error = null;
        }
      })
      .addCase(ordersGetRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.orders = [];
        state.error = action.payload.body;
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
