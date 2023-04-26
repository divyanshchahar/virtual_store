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

      if (response.ok) {
        const json = await response.json();
        return json;
      }

      throw new Error("Something went wrong");
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
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.products = [];
        } else {
          state.status = "sucess";
          state.products = action.payload;
        }
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
