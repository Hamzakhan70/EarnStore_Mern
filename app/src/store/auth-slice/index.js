import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};
console.log("Backend URL:", BASE_URL);
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
      withCredentials: true,
    });
    return response;
  }
);
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  // const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
  const response = await axios.post(
    `https://earnstoremern-production.up.railway.app/api/auth/login`,
    formData,
    {
      withCredentials: true,
    }
  );
  return response.data;
});
export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.post(`${BASE_URL}/auth/check-auth`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null),
          (state.isAuthenticated = action.payload.success);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success),
          (state.user = action.payload.user ? action.payload.user : null);
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
