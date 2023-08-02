import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  cart: {},
  status: "idle",
  response: null,
  error: null,
};

// POST
export const cartPostRequest = createAsyncThunk(
  "cart/cartPostRequest",
  async ({ acessToken, body }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      return { ok: response.ok, body: json.user, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
    }
  }
);

// GET
export const cartGetRequest = createAsyncThunk(
  "cart/cartGetRequest",
  async ({ acessToken }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return { ok: response.ok, body: json.user, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
    }
  }
);

// PUT
export const cartPutRequest = createAsyncThunk(
  "cart/cartPutRequest",
  async ({ acessToken, body }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      return { ok: response.ok, body: json.user, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
    }
  }
);

// DELETE
export const cartDeleteRequest = createAsyncThunk(
  "cart/cartDeleteRequest",
  async ({ acessToken }) => {
    try {
      const response = await fetch(apiEndPoints.cart, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return { ok: response.ok, body: json.user, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
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
      state.response = null;
    },
  },

  extraReducers(builder) {
    builder
      // POST REQUEST
      .addCase(cartPostRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
        state.response = null;
      })
      .addCase(cartPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(cartPostRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // GET REQUEST
      .addCase(cartGetRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
        state.response = null;
      })
      .addCase(cartGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(cartGetRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // PUT REQUEST
      .addCase(cartPutRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
        state.response = null;
      })
      .addCase(cartPutRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(cartPutRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // DELETE
      .addCase(cartDeleteRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.cart = {};
        state.error = null;
        state.response = null;
      })
      .addCase(cartDeleteRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.cart = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.cart = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(cartDeleteRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.cart = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
