import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import linkReducer from './slices/linkSlice';
import analyticsReducer from './slices/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    links: linkReducer,
    analytics: analyticsReducer
  },
});
