import { createSlice } from '@reduxjs/toolkit';

// Initial state for the history feature
const initialState = {
  history: [],
  loading: false,
  error: null,
};

// Create history slice with reducers for handling history operations
const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    // Start loading state when fetching history
    fetchHistoryStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Handle successful history fetch
    fetchHistorySuccess(state, action) {
      state.loading = false;
      state.history = action.payload;
    },
    // Handle failed history fetch
    fetchHistoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Add a new item to history
    addToHistory(state, action) {
      state.history.unshift(action.payload);
    },
    // Clear all history
    clearHistory(state) {
      state.history = [];
    },
    // Remove a specific history item
    removeHistoryItem(state, action) {
      state.history = state.history.filter((item) => item.id !== action.payload);
    },
  },
});

// Export actions
export const {
  fetchHistoryStart,
  fetchHistorySuccess,
  fetchHistoryFailure,
  addToHistory,
  clearHistory,
  removeHistoryItem,
} = historySlice.actions;

// Export selectors
export const selectHistory = (state) => state.history.history;
export const selectHistoryLoading = (state) => state.history.loading;
export const selectHistoryError = (state) => state.history.error;

// Export the reducer
export default historySlice.reducer;
