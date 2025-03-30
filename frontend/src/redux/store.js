import { configureStore } from '@reduxjs/toolkit';
import layersReducer from './layersSlice';
import toolsReducer from './toolsSlice';

const store = configureStore({
  reducer: {
    layers: layersReducer,
    tools: toolsReducer,
  },
});

export default store;
