import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import navReducer from './slices/navSlice';
import dashboardReducer from './slices/dashboardSlice';
import accountReducer from './slices/accountSlice';
import uploadReducer from './slices/uploadSlice';

import blogReducer from './slices/blogSlice';
// Define the store with your reducers
export const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer, 
    modal: modalReducer,
    nav: navReducer,
    blog: blogReducer,
    dashboard: dashboardReducer,
    account: accountReducer,
    upload: uploadReducer,
  },
});

// Type definitions for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
