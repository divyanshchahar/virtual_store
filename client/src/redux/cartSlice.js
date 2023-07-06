import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  cart: {},
  status: "idle",
  error: null,
};

// POST
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

// GET
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

// PUT
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
      state.status = reducerStatus.fulfilled;
      state.cart = {};
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder
      // POST REQUEST
      .addCase(cartPostRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
      })
      .addCase(cartPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartPostRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = null || action.payload;
      })
      // GET REQUEST
      .addCase(cartGetRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
      })
      .addCase(cartGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartGetRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = null || action.payload;
      })
      // PUT REQUEST
      .addCase(cartPutRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
      })
      .addCase(cartPutRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
        }
      })
      .addCase(cartPutRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = null || action.payload;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
