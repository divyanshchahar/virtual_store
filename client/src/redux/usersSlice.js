import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";

const initialState = {
  users: {},
  status: "idle",
  error: null,
};

export const createUsersApi = createAsyncThunk(
  "users/createUsersApi",
  async ({ acessToken, userData }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(userData),
      });

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

export const updateUserApi = createAsyncThunk(
  "user/updateUserApi",
  async ({ acessToken, userData }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(userData),
      });

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

export const getUsersApi = createAsyncThunk(
  "users/getUsersApi",
  async ({ acessToken, authId }) => {
    try {
      const response = await fetch(`${apiEndPoints.users}/${authId}`, {
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
      return e.messgae;
    }
  }
);

export const deleteUserApi = createAsyncThunk(
  "users/deleteUserApi",
  async ({ acessToken, id }) => {
    try {
      const response = await fetch(`${apiEndPoints.users}/${id}`, {
        method: "DELETE",
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
  reducers: {
    resetUser: (state) => {
      state.status = "fulfilled ";
      state.error = null;
      state.users = {};
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUsersApi.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.users = {};
        } else {
          state.status = "sucess";
          state.users = action.payload;
        }
      })
      .addCase(createUsersApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(createUsersApi.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(getUsersApi.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.users = {};
        } else {
          state.status = "sucess";
          state.users = action.payload;
        }
      })
      .addCase(getUsersApi.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(getUsersApi.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(updateUserApi.fulfilled, (state, action) => {
        if (action.payload === "Something went wrong") {
          state.status = "rejected";
          state.users = {};
        } else {
          state.status = "sucess";
          state.users = action.payload;
        }
      })
      .addCase(updateUserApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(updateUserApi.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(deleteUserApi.fulfilled, (state, action) => {
        state.status = "sucess";
      })
      .addCase(deleteUserApi.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(deleteUserApi.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export const { resetUser } = usersSlice.actions;
export default usersSlice.reducer;
