import { AccountSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DashboardService} from '@/services/dashboard'; 
import { RootState } from '../store';
  
//initial state
const initialState: AccountSlice = {
    loading: false,
    error: null,
    disableMode: true
};

//Actions
// export const statsData = createAsyncThunk('dashboardStats', async (data: string, { rejectWithValue }) => {
//     try{
//         const response: any = await DashboardService.dashboardStats(data);
//         console.log("After api call", response)
//         if(response.data.status === 'Failed'){
//             return rejectWithValue(response.data)
//         }
//         return response.data;
//     }catch(error: any) {
//         return rejectWithValue(error);
//     }
// });

//Slice
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setEditMode: (state) => {
            state.disableMode = !state.disableMode
        }
    },
    extraReducers: (builder) => {
        builder

        // .addCase(statsData.pending, (state) => {
        //     state.loading = true;
        //     state.error = null
        // })
        // .addCase(statsData.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.stats = action?.payload?.result;
        //     console.log("Stat data action payload", action.payload)
        // })
        // .addCase(statsData.rejected, (state, action: any) => {
        //     state.loading = false;
        //     state.error = action.payload?.message || 'Something went wrong';
        // })

    }
})

export const {setEditMode} = accountSlice.actions;

export default accountSlice.reducer;

//selectors
export const getAccountSlice = (state: RootState) => state.account