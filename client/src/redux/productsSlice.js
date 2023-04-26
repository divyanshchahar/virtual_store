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
      return json;
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
      .addCase(getProductsApi.fulfilled, (state, action) => {
        state.status = "sucess";
        state.products = action.payload;
      })
      .addCase(getProductsApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getProductsApi.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default productsSlice.reducer;
