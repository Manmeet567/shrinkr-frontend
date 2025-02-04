import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const initialState = {
  analyticsByPage: {},
  completeAnalytics: {},
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async (
    { shortUrlIds, page = 1, limit = 10 },
    { rejectWithValue, getState }
  ) => {
    const { analyticsByPage } = getState().analytics;

    // Return cached data if available
    if (analyticsByPage[page]) {
      return {
        analytics: analyticsByPage[page],
        page,
        totalPages: getState().analytics.totalPages,
      };
    }

    try {
      const response = await apiClient.post(`/clicks/get-clicks`, {
        shortUrlIds,
        page,
        limit,
      });

      return {
        analytics: response.data.clicks,
        page,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      toast.error("Failed to fetch analytics.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk to fetch complete analytics
export const getCompleteAnalytics = createAsyncThunk(
  "analytics/getCompleteAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/clicks/analytics`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    setAnalyticsCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        const { analytics, page, totalPages } = action.payload;

        state.totalPages = totalPages;
        state.currentPage = page;
        state.analyticsByPage[page] = analytics;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch analytics.";
      })
      
      .addCase(getCompleteAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCompleteAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.completeAnalytics = action.payload; 
      })
      .addCase(getCompleteAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAnalyticsCurrentPage } = analyticsSlice.actions;

export default analyticsSlice.reducer;
