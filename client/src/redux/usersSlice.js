import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  users: {},
  status: "idle",
  error: null,
};

// POST
export const usersPostRequest = createAsyncThunk(
  "users/usersPostRequest",
  async ({ body }) => {
    try {
      const response = await fetch(apiEndPoints.signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const json = await response.json();

      return { ok: response.ok, body: json.user };
    } catch (error) {
      return error.message;
    }
  }
);

// GET
export const usersGetRequest = createAsyncThunk(
  "users/usersGetRequest",
  async ({ acessToken }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.messgae;
    }
  }
);

// PUT
export const usersPutRequest = createAsyncThunk(
  "user/usersPutRequest",
  async ({ acessToken, body }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${acessToken}`,
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.message;
    }
  }
);

// DELETE
export const usersDeleteRequest = createAsyncThunk(
  "users/usersDeleteRequest",
  async ({ acessToken }) => {
    try {
      const response = await fetch(apiEndPoints.users, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${acessToken}`,
        },
      });

      const json = await response.json();

      return { ok: response.ok, body: json };
    } catch (error) {
      return error.messgae;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //POST REQUEST
      .addCase(usersPostRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
      })
      .addCase(usersPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
        }
      })
      .addCase(usersPostRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = null || action.payload;
      })
      // GET REQUEST
      .addCase(usersGetRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
      })
      .addCase(usersGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
        }
      })
      .addCase(usersGetRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = null || action.payload;
      })
      // PUT REQUEST
      .addCase(usersPutRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
      })
      .addCase(usersPutRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
        }
      })
      .addCase(usersPutRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = null || action.payload;
      })
      // DELETE REQUEST
      .addCase(usersDeleteRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
      })
      .addCase(usersDeleteRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null || action.payload?.body;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
        }
      })
      .addCase(usersDeleteRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = null || action.payload;
      });
  },
});

export const { resetUser } = usersSlice.actions;
export default usersSlice.reducer;
