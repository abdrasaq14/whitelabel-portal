import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import navReducer from './slices/navSlice';
import dashboardReducer from './slices/dashboardSlice';
import accountReducer from './slices/accountSlice';
import uploadReducer from './slices/uploadSlice';
import inventoryReducer from './slices/inventorySlice';

// Define the store with your reducers
export const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer, 
    modal: modalReducer,
    nav: navReducer,
    dashboard: dashboardReducer,
    account: accountReducer,
    upload: uploadReducer,
    inventory: inventoryReducer
  },
});

// Type definitions for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
