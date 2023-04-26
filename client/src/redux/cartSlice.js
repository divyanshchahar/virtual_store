import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  cart: {},
  status: "idle",
  error: null,
};

export const getCartApi = createAsyncThunk(
  "cart/getCartApi",
  async ({ acessToken, customerId }) => {
    try {
      const response = await fetch(`${apiEndPoints.cart}/${customerId}`, {
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

export const createCartApi = createAsyncThunk(
  "cart/createCartApi",
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

export const updateCartApi = createAsyncThunk(
  "cart/updateCartApi",
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.status = "fullfilled";
      state.error = null;
      state.cart = [];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getCartApi.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.cart = {};
          state.error = action.payload;
        } else {
          state.status = "sucess";
          state.cart = action.payload;
          state.error = null;
        }
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
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.cart = {};
          state.error = action.payload;
        } else {
          state.status = "sucess";
          state.cart = action.payload;
          state.error = null;
        }
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
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.cart = {};
          state.error = action.payload;
        } else {
          state.status = "sucess";
          state.cart = action.payload;
          state.error = null;
        }
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

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
