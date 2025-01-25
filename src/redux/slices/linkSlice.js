import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

// Initial state
const initialState = {
  links: [], // Stores the list of links
  loading: false, // Tracks loading state
  error: null, // Stores error messages
};

// Async thunk for creating a link
export const createLink = createAsyncThunk(
  "links/createLink",
  async (linkData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/link/create-link`, linkData);
      toast.success(response.data.message);
      return response.data.link; // Return the created link data
    } catch (error) {
      toast.error("Failed to create link.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null; // Resets the error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state for createLink
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fulfilled state for createLink
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links.push(action.payload); // Add the new link to the list
      })
      // Handle rejected state for createLink
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create link.";
      });
  },
});

export const { resetError } = linkSlice.actions;

export default linkSlice.reducer;
