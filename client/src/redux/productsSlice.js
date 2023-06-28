import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

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
        state.products = [];
        state.status = "pending";
        state.error = null;
      })
      .addCase(getProductsApi.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.products = [];
          state.status = "failed";
          state.error = action.payload.body;
        } else {
          state.products = action.payload.body;
          state.status = "sucess";
          state.error = null;
        }
      })
      .addCase(getProductsApi.rejected, (state, action) => {
        state.products = [];
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
