import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  cart: {},
  status: "idle",
  error: null,
};

export const cartGetRequest = createAsyncThunk(
  "cart/cartGetRequest",
  async ({ acessToken, customerId }) => {
    try {
      const response = await fetch(`${apiEndPoints.cart}/${customerId}`, {
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

export const cartPostRequest = createAsyncThunk(
  "cart/cartPostRequest",
  async ({ acessToken, cartData }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(cartData),
      });

      const json = response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

export const cartPutRequest = createAsyncThunk(
  "cart/cartPutRequest",
  async ({ acessToken, cartData }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(cartData),
      });

      const json = response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.status = "fullfilled";
      state.error = null;
      state.cart = {};
    },
  },

  extraReducers(builder) {
    builder
      // GET REQUEST
      .addCase(cartGetRequest.pending, (state, action) => {
        state.status = "pending";
        state.cart = {};
        state.error = null;
      })
      .addCase(cartGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = "failed";
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = "sucess";
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartGetRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = {};
        state.error = null || action.payload?.body;
      })
      // GET REQUEST
      .addCase(cartPostRequest.pending, (state, action) => {
        state.status = "pending";
        state.cart = {};
        state.error = null;
      })
      .addCase(cartPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = "failed";
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = "sucess";
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartPostRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = {};
        state.error = null || action.payload?.body;
      })
      // POST REQUEST
      .addCase(cartPostRequest.pending, (state, action) => {
        state.status = "pending";
        state.cart = {};
        state.error = null;
      })
      .addCase(cartPostRequest.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = "sucess";
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartPostRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.cart = {};
        state.error = null || action.payload?.body;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
