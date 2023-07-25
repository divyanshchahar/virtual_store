import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

// POST
export const ordersPostRequest = createAsyncThunk(
  "orders/ordersPostRequest",
  async ({ acessToken, body }) => {
    try {
      const response = await fetch(apiEndPoints.orders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

// GET
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
    } catch (error) {
      return error.message;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.status = reducerStatus.fulfilled;
      state.error = null;
      state.orders = [];
    },
  },

  extraReducers(builder) {
    builder
      // POST REQUEST
      .addCase(ordersPostRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.orders = [];
        state.error = null;
      })
      .addCase(ordersPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.orders = [];
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.orders = action.payload.body;
          state.error = null;
        }
      })
      .addCase(ordersPostRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.orders = [];
        state.error = action.payload.body;
      })
      // GET REQUEST
      .addCase(ordersGetRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.orders = [];
        state.error = null;
      })
      .addCase(ordersGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.orders = [];
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.orders = action.payload.body;
          state.error = null;
        }
      })
      .addCase(ordersGetRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.orders = [];
        state.error = action.payload.body;
      });
  },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
