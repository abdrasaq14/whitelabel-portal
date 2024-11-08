import { DashboardSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DashboardService} from '@/services/dashboard'; 
import { RootState } from '../store';
  
//initial state
const initialState: DashboardSlice = {
    loading: false,
    error: null,
    stats: ''
};

//Actions
export const statsData = createAsyncThunk('dashboardStats', async (data: string, { rejectWithValue }) => {
    try{
        const response: any = await DashboardService.dashboardStats(data);
        console.log("After api call", response)
        if(response.data.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

//Slice
const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // setOtpValue: (state, action) => {
        //     state.otp = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder

        .addCase(statsData.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(statsData.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Stat data action payload", action.payload)
        })
        .addCase(statsData.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

    }
})

// export const {setOtpValue} = dashboardSlice.actions;

export default dashboardSlice.reducer;

//selectors
export const getDashboardSlice = (state: RootState) => state.dashboard