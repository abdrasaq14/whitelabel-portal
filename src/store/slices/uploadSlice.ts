import { UploadSlice } from '@/interfaces/SliceInterfaces';
import { Otp, UserLogin } from '@/interfaces/AppInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthService} from '@/services/AuthService'; 
import { RootState } from '../store';
import { UserService } from '@/services/UserService';
  
//initial state
const initialState: UploadSlice = {
    loading: false,
    error: null,
    uploading: false,
    imageHolder: null
};

//Actions
export const staffUpdated = createAsyncThunk('staffUpdated', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await UserService.updateStaff(data.payload, data.id);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

//Slice
const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {
        setUploading: (state, action) => {
            state.uploading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        holdImage: (state, action) => {
            state.imageHolder = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(staffUpdated.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(staffUpdated.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(staffUpdated.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })
    }
})

export const {setUploading, setError, holdImage} = uploadSlice.actions;

export default uploadSlice.reducer;

//selectors
export const getUploadSlice = (state: RootState) => state.upload