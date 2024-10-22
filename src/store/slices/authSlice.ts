import { UserSlice } from '@/interfaces/SliceInterfaces';
import { UserLogin } from '@/interfaces/AppInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthService} from '@/services/auth'; 
import { RootState } from '../store';
  
//initial state
const initialState: UserSlice = {
    loading: false,
    userData: null,
    error: null
};

//Actions
export const userLogin = createAsyncThunk('login', async (data: UserLogin) => {
    const response: any = await AuthService.login(data);
    return response.data;
});

//Slice
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong';
        })
    }
})

// export const {} = userSlice.actions;
export default authSlice.reducer;

//selectors
export const getAuthSlice = (state: RootState) => state.auth