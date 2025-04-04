import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  fontSize: 'medium',
  notifications: true,
  language: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const { setTheme, setFontSize, toggleNotifications, setLanguage, resetSettings } =
  settingsSlice.actions;

export default settingsSlice.reducer;
