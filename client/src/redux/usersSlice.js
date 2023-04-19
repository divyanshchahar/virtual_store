import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  users: {},
  status: "idle",
  error: null,
};

export const createUsers = createAsyncThunk(
  "users/createUsers",
  async ({ userData, acessToken }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      return json;
    } catch (error) {
      return error.message;
    }
  }
);

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async ({ authId, acessToken }) => {
    try {
      const response = await fetch(`${apiEndPoints.users}/${authId}`, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return json;
    } catch (e) {
      return e.messgae;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createUsers.fulfilled, (state, action) => {
        state.status = "sucess";
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createUsers.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getUsers.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default usersSlice.reducer;
