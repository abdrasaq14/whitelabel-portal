import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import navReducer from './slices/navSlice';
import dashboardReducer from './slices/dashboardSlice';
import accountReducer from './slices/accountSlice';
import uploadReducer from './slices/uploadSlice';
<<<<<<< HEAD
import inventoryReducer from './slices/inventorySlice';
import messageReducer from './slices/messageSlice';
import orderReducer from "./slices/orderSlice"

=======
import blogReducer from './slices/blogSlice';
import productReducer from './slices/productSlice';
>>>>>>> feat/restructured-code
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
<<<<<<< HEAD
    inventory: inventoryReducer,
    message: messageReducer,
    order: orderReducer,
=======
    product: productReducer
>>>>>>> feat/restructured-code
  },
});

// Type definitions for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
