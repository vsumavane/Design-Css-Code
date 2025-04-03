import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  elements: [],
  selectedElement: null,
  isDrawing: false,
  tool: 'select', // select, rectangle, circle, line, etc.
  color: '#000000',
  strokeWidth: 1,
  canvasHistory: [],
  historyIndex: -1,
};

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload);
      state.canvasHistory = [
        ...state.canvasHistory.slice(0, state.historyIndex + 1),
        [...state.elements],
      ];
      state.historyIndex += 1;
    },
    updateElement: (state, action) => {
      const { id, ...props } = action.payload;
      state.elements = state.elements.map((element) =>
        element.id === id ? { ...element, ...props } : element
      );
    },
    deleteElement: (state, action) => {
      state.elements = state.elements.filter((element) => element.id !== action.payload);
      state.canvasHistory = [
        ...state.canvasHistory.slice(0, state.historyIndex + 1),
        [...state.elements],
      ];
      state.historyIndex += 1;
    },
    setSelectedElement: (state, action) => {
      state.selectedElement = action.payload;
    },
    setTool: (state, action) => {
      state.tool = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
    setStrokeWidth: (state, action) => {
      state.strokeWidth = action.payload;
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.elements = [...state.canvasHistory[state.historyIndex]];
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.canvasHistory.length - 1) {
        state.historyIndex += 1;
        state.elements = [...state.canvasHistory[state.historyIndex]];
      }
    },
    clearCanvas: (state) => {
      state.elements = [];
      state.selectedElement = null;
      state.canvasHistory = [[]];
      state.historyIndex = 0;
    },
  },
});

export const {
  addElement,
  updateElement,
  deleteElement,
  setSelectedElement,
  setTool,
  setColor,
  setStrokeWidth,
  setIsDrawing,
  undo,
  redo,
  clearCanvas,
} = canvasSlice.actions;

export default canvasSlice.reducer;
