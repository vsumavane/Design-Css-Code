import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch assets
export const fetchAssets = createAsyncThunk(
  'assets/fetchAssets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/assets');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Create the assets slice
const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    addAsset: (state, action) => {
      state.items.push(action.payload);
    },
    updateAsset: (state, action) => {
      const { id, ...updates } = action.payload;
      const existingAsset = state.items.find((asset) => asset.id === id);
      if (existingAsset) {
        Object.assign(existingAsset, updates);
      }
    },
    removeAsset: (state, action) => {
      state.items = state.items.filter((asset) => asset.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addAsset, updateAsset, removeAsset } = assetsSlice.actions;
export default assetsSlice.reducer;
