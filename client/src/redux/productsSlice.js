import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

// GET
export const getProductsApi = createAsyncThunk(
  "products/getProductsApi",
  async () => {
    try {
      const response = await fetch(apiEndPoints.products);
      const json = await response.json();
      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductsApi.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.products = [];
        state.error = null;
      })
      .addCase(getProductsApi.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.products = [];
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.products = action.payload.body;
          state.error = null;
        }
      })
      .addCase(getProductsApi.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.products = [];
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
