import { AccountSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserService } from '@/services/UserService';
  
//initial state
const initialState: AccountSlice = {
    loading: false,
    error: null,
    disableMode: true,
    staffsResult: null
};

//Actions
export const editUserInfo = createAsyncThunk('editUserInfo', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await UserService.editUserInfo(data);
        // console.log("After api call", response)
        if(response.data.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const usersFetched = createAsyncThunk('usersFetched', async (_, { rejectWithValue }) => {
    try{
        const response: any = await UserService.getAllUsers();
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response?.data)
        }
        return response?.data;
    }catch(error: any){
        return rejectWithValue(error)
    }
});

export const staffCreated = createAsyncThunk('staffCreated', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await UserService.createStaff(data);
        // console.log("After api call", response)
        if(response.data.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

//Slice
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setEditMode: (state) => {
            state.disableMode = !state.disableMode
        },
        // updateStaffList: (state, action) => {
        //     state.staffsResult?.results?.unshift(action.payload)
        // }
    },
    extraReducers: (builder) => {
        builder

        .addCase(editUserInfo.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(editUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.disableMode = !state.disableMode;
            // console.log("Edit user data action payload", action.payload)
        })
        .addCase(editUserInfo.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(usersFetched.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(usersFetched.fulfilled, (state, action) => {
            state.loading = false;
            // console.log("From redux", action.payload)
            state.staffsResult = action.payload?.result;
        })
        .addCase(usersFetched.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(staffCreated.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(staffCreated.fulfilled, (state, action) => {
            state.loading = false;
            // console.log("From redux", action.payload)
            // state.staffsResult. = action.payload?.result.user;
            state.staffsResult?.results?.unshift(action.payload?.result?.user)
        })
        .addCase(staffCreated.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

    }
})

export const {setEditMode} = accountSlice.actions;

export default accountSlice.reducer;

//selectors
export const getAccountSlice = (state: RootState) => state.account