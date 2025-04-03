import { configureStore } from '@reduxjs/toolkit';
import layersReducer from './layersSlice';
import toolsReducer from './toolsSlice';
import historyReducer from './historySlice';
import canvasReducer from './canvasSlice';
import settingsReducer from './settingsSlice';
import assetsReducer from './assetsSlice';
import userReducer from './userSlice';

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
    history: historyReducer, // For undo/redo functionality
    canvas: canvasReducer, // For canvas settings (size, zoom, etc.)
    settings: settingsReducer, // For app settings (theme, preferences)
    assets: assetsReducer, // For managing images, icons, etc.
    user: userReducer, // For user authentication, preferences
  },
  preloadedState: persistedState,
});

// Listen for state changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
