import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const createOrdersApi = createAsyncThunk(
  "orders/createOrdersApi",
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
      return json;
    } catch (e) {
      return e.message;
    }
  }
);

export const getOrdersApi = createAsyncThunk(
  "orders/getOrdersApi",
  async ({ acessToken, customerId }) => {
    try {
      const response = await fetch(`${apiEndPoints.orders}/${customerId}`, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        return json;
      }

      throw new Error("Something went wrong");
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
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.orders = [];
        } else {
          state.status = "sucess";
          state.orders = action.payload;
        }
      })
      .addCase(createOrdersApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createOrdersApi.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getOrdersApi.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.orders = [];
        } else {
          state.status = "sucess";
          state.orders = action.payload;
        }
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
