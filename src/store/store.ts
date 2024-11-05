import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import navReducer from './slices/navSlice';

import blogReducer from './slices/blogSlice';
// Define the store with your reducers
export const store = configureStore({
  reducer: {
    // Add reducers here
    auth: authReducer, 
<<<<<<< HEAD
<<<<<<< HEAD
    modal: modalReducer,
    nav: navReducer
=======
<<<<<<< HEAD
    modal: modalReducer
=======
    blog: blogReducer
>>>>>>> a0b671c (blog module in progress)
>>>>>>> 79bf557 (blog module in progress)
=======
    modal: modalReducer,
    blog: blogReducer
>>>>>>> 5052d24 (blog module in progress)
  },
});

// Type definitions for the RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
