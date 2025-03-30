import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  layers: [], // Array of all layers
  selectedLayer: null, // Track the selected layer
};

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    // Add new layer
    addLayer: (state, action) => {
      state.layers.push({
        ...action.payload,
        visible: true,
        locked: false,
      });
    },

    // Update layer
    updateLayer: (state, action) => {
      const index = state.layers.findIndex((layer) => layer.id === action.payload.id);
      if (index !== -1) {
        state.layers[index] = { ...state.layers[index], ...action.payload };
      }
    },

    // Delete layer
    deleteLayer: (state, action) => {
      state.layers = state.layers.filter((layer) => layer.id !== action.payload);
    },

    // Select Layer
    selectLayer: (state, action) => {
      state.selectedLayer = action.payload;
    },

    // Toggle Visibility
    toggleVisibility: (state, action) => {
      const layer = state.layers.find((layer) => layer.id === action.payload);
      if (layer) {
        layer.visible = !layer.visible;
      }
    },

    // Lock/Unlock Layer
    toggleLock: (state, action) => {
      const layer = state.layers.find((layer) => layer.id === action.payload);
      if (layer) {
        layer.locked = !layer.locked;
      }
    },
  },
});

export const { addLayer, updateLayer, deleteLayer, selectLayer, toggleVisibility, toggleLock } =
  layersSlice.actions;
export default layersSlice.reducer;
