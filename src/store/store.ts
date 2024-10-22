import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

// Define the store with your reducers
export const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer, 
  },
});

// Type definitions for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
