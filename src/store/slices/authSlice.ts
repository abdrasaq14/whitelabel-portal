import { UserSlice } from '@/interfaces/SliceInterfaces';
import { Otp, UserLogin } from '@/interfaces/AppInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthService} from '@/services/AuthService'; 
import { RootState } from '../store';
  
//initial state
const initialState: UserSlice = {
    loading: false,
    error: null,
    otp: ''
};

//Actions
export const userLogin = createAsyncThunk('login', async (data: UserLogin, { rejectWithValue }) => {
    try{
        const response: any = await AuthService.login(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const otpVerified = createAsyncThunk('verifyOtp', async (data: Otp, { rejectWithValue }) => {
    try{
        const response: any = await AuthService.verifyOtp(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response?.data)
        }
        return response?.data;
    }catch(error: any){
        return rejectWithValue(error)
    }
});

export const passwordReset = createAsyncThunk('passwordReset', async (data: Otp, { rejectWithValue }) => {
    try{
        const response: any = await AuthService.resetPassword(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response?.data)
        }
        return response?.data;
    }catch(error: any){
        return rejectWithValue(error)
    }
});

export const passwordForgotten = createAsyncThunk('passwordForgotten', async (data: Otp, { rejectWithValue }) => {
    try{
        const response: any = await AuthService.forgotPassword(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response?.data)
        }
        return response?.data;
    }catch(error: any){
        return rejectWithValue(error)
    }
});

//Slice
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setOtpValue: (state, action) => {
            state.otp = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(userLogin.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(userLogin.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(userLogin.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(otpVerified.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(otpVerified.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(otpVerified.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(passwordReset.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(passwordReset.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(passwordReset.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(passwordForgotten.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(passwordForgotten.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(passwordForgotten.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

    }
})

export const {setOtpValue} = authSlice.actions;

export default authSlice.reducer;

//selectors
export const getAuthSlice = (state: RootState) => state.auth