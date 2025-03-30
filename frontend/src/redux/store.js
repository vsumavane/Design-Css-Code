import { configureStore } from '@reduxjs/toolkit';
import layersReducer from './layersSlice';
import toolsReducer from './toolsSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // No persisted state, return undefined
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const persistedState = loadState();

const store = configureStore({
  reducer: {
    layers: layersReducer,
    tools: toolsReducer,
  },
  preloadedState: persistedState,
});

// Listen for state changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
