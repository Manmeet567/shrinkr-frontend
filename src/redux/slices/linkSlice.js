import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const initialState = {
  links: [],
  loading: false,
  error: null,
};

// Thunk to create a new link
export const createLink = createAsyncThunk(
  "links/createLink",
  async (linkData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/link/create-link`, linkData);
      toast.success(response.data.message);
      return response.data.link;
    } catch (error) {
      toast.error("Failed to create link.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to get all links for the current user
export const getLinks = createAsyncThunk(
  "links/getLinks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/link/get-links`); 
      return response.data; 
    } catch (error) {
      toast.error("Failed to fetch links.");
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
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        state.links.push(action.payload); 
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create link.";
      })

      .addCase(getLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.links = action.payload; 
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch links.";
      });
  },
});

export const { resetError } = linkSlice.actions;

export default linkSlice.reducer;
