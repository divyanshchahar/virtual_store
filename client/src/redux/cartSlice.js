import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const getCartApi = createAsyncThunk(
  "cart/getCartApi",
  async ({ acessToken, customerId }) => {
    try {
      const response = await fetch(`${apiEndPoints.orders}/${customerId}`, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return json;
    } catch (e) {
      return e.message;
    }
  }
);

export const createCartApi = createAsyncThunk(
  "cart/createCartApi",
  async ({ acessToken, cartData }) => {
    try {
      const response = await fetch(apiEndPoints.orders, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(cartData),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      return e.message;
    }
  }
);

export const updateCartApi = createAsyncThunk(
  "cart/updateCartApi",
  async ({ acessToken, cartData }) => {
    try {
      const response = await fetch(apiEndPoints.orders, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(cartData),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      return e.message;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducer: {},
  extraReducers(builder) {
    builder
      .addCase(getCartApi.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCartApi.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(getCartApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = null;
      })
      .addCase(createCartApi.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(createCartApi.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(createCartApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = null;
      })
      .addCase(updateCartApi.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(updateCartApi.pending, (state, action) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(updateCartApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = null;
      });
  },
});

export default cartSlice.reducer;
