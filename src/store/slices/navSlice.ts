import { NavSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
  
//initial state
const initialState: NavSlice = {
    messageCounter: 0,
    newNotification: false,
    breadcrumb: '',
    isOpen: true,
    activeLabel: 'Dashboard'
};

//Actions
// export const userLogin = createAsyncThunk('login', async (data: UserLogin, { rejectWithValue }) => {
//     try{
//         const response: any = await AuthService.login(data);
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
const navSlice = createSlice({
    name: 'navs',
    initialState,
    reducers: {
        toggleSideNav: (state) => {
            state.isOpen = !state.isOpen;
        }
    },
    // extraReducers: (builder) => {
    //     builder

    //     .addCase(userLogin.pending, (state) => {
    //         state.loading = true;
    //         state.error = null
    //     })
    //     .addCase(userLogin.fulfilled, (state) => {
    //         state.loading = false;
    //     })
    //     .addCase(userLogin.rejected, (state, action: any) => {
    //         state.loading = false;
    //         state.error = action.payload?.message || 'Something went wrong';
    //     })
    // }
})

export const {toggleSideNav} = navSlice.actions;

export default navSlice.reducer;

//selectors
export const getNavSlice = (state: RootState) => state.nav