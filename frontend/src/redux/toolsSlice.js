import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTool: null,
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setSelectedTool: (state, action) => {
      state.selectedTool = action.payload;
    },
  },
});

export const { setSelectedTool } = toolsSlice.actions;
export default toolsSlice.reducer;
