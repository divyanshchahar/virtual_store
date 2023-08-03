import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiEndPoints from "../assets/api_endpoints";
import reducerStatus from "../assets/ReducerStatus";

const initialState = {
  users: {},
  status: "idle",
  response: null,
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

      // post requests object contains both user object and acess token
      return { ok: response.ok, body: json.user, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
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

      return { ok: response.ok, body: json, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
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

      return { ok: response.ok, body: json, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
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

      await response.json();

      return { ok: response.ok, body: {}, response: response.status };
    } catch (error) {
      return { ok: false, body: {}, response: 500, error: error };
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
        state.response = null;
      })
      .addCase(usersPostRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(usersPostRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // GET REQUEST
      .addCase(usersGetRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
        state.response = null;
      })
      .addCase(usersGetRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(usersGetRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // PUT REQUEST
      .addCase(usersPutRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
        state.response = null;
      })
      .addCase(usersPutRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(usersPutRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      })
      // DELETE REQUEST
      .addCase(usersDeleteRequest.pending, (state, action) => {
        state.status = reducerStatus.pending;
        state.users = {};
        state.error = null;
        state.response = null;
      })
      .addCase(usersDeleteRequest.fulfilled, (state, action) => {
        if (!action.payload.ok || typeof action.payload.body !== "object") {
          state.status = reducerStatus.rejected;
          state.users = {};
          state.error = null;
          state.response = action.payload.response;
        } else {
          state.status = reducerStatus.fulfilled;
          state.users = action.payload.body;
          state.error = null;
          state.response = action.payload.response;
        }
      })
      .addCase(usersDeleteRequest.rejected, (state, action) => {
        state.status = reducerStatus.rejected;
        state.users = {};
        state.error = action.payload.error;
        state.response = action.payload.response;
      });
  },
});

export const { resetUser } = usersSlice.actions;
export default usersSlice.reducer;
