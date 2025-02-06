import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";
const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/common/feature/get`
    );

    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${BASE_URL}/common/feature/add`,
      { image }
    );

    return response.data;
  }
);
export const deleteFeatureImage = createAsyncThunk(
  "order/deleteFeatureImage",
  async (image_url, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/common/feature/delete`,
        { data: { image_url } } // `axios.delete` requires `data` to send body
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting image");
    }
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;
