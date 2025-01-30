import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const initialState = {
  linksByPage: {}, // Store links for each page
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  shortUrlIds: [],
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

export const getLinks = createAsyncThunk(
  "links/getLinks",
  async ({ page = 1, limit = 10 }, { rejectWithValue, getState }) => {
    const { linksByPage } = getState().links;

    if (linksByPage[page]) {
      return {
        links: linksByPage[page],
        page,
        totalPages: getState().links.totalPages,
      };
    }

    try {
      const response = await apiClient.get(`/link/get-links`, {
        params: { page, limit },
      });
      return {
        links: response.data.links,
        page,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      toast.error("Failed to fetch links.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async (
    { _id, destination_url, remarks, expiration },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(`/link/update-link/${_id}`, {
        destination_url,
        remarks,
        expiration,
      });
      toast.success(response.data.message);
      return { _id, updatedLink: response.data.link };
    } catch (error) {
      toast.error("Failed to update link.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/link/delete-link/${id}`);
      toast.success(response.data.message);
      return { id };
    } catch (error) {
      toast.error("Failed to delete link.");
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const linkSlice = createSlice({
  name: "links",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createLink cases
      .addCase(createLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.loading = false;
        const currentPage = state.currentPage;

        // Add the new link to the current page in linksByPage
        if (state.linksByPage[currentPage]) {
          state.linksByPage[currentPage] = [
            ...state.linksByPage[currentPage],
            action.payload,
          ];
        } else {
          state.linksByPage[currentPage] = [action.payload];
        }
      })
      .addCase(createLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create link.";
      })

      // Handle getLinks cases
      .addCase(getLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLinks.fulfilled, (state, action) => {
        state.loading = false;
        const { links, page, totalPages } = action.payload;
        state.totalPages = totalPages;
        state.currentPage = page;
        state.linksByPage[page] = links;
        state.shortUrlIds = links.map((link) => link.short_url_id);
      })
      .addCase(getLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch links.";
      })

      // Handle updateLink cases
      .addCase(updateLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLink.fulfilled, (state, action) => {
        state.loading = false;
        const { _id, updatedLink } = action.payload;
        const currentPage = state.currentPage;

        // Update the specific link in linksByPage
        if (state.linksByPage[currentPage]) {
          state.linksByPage[currentPage] = state.linksByPage[currentPage].map(
            (link) => (link._id === _id ? updatedLink : link)
          );
        }
      })
      .addCase(updateLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update link.";
      })

      // Handle deleteLink cases
      .addCase(deleteLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLink.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        const currentPage = state.currentPage;

        if (state.linksByPage[currentPage]) {
          state.linksByPage[currentPage] = state.linksByPage[currentPage].filter(
            (link) => link._id !== id
          );
        }
      })
      .addCase(deleteLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete link.";
      });
  },
});

export const { setCurrentPage } = linkSlice.actions;

export default linkSlice.reducer;
