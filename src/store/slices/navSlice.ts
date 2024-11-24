import { NavSlice } from '@/interfaces/SliceInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { NotificationService } from '@/services/NotificationService';
  
//initial state
const initialState: NavSlice = {
    messageCounter: 0,
    newNotifications: null,
    notifications: null,
    breadcrumb: '',
    isOpen: true,
    error: null,
    activeNotification: null,
    showLogoutModal: false,
    activeLabel: '',
    showStaffInfoModal: false,
    activeStaff: null,
    showCreateStaffModal: false
};

//Actions
export const newNotification = createAsyncThunk('newNotification', async (_, { rejectWithValue }) => {
    try{
        const response: any = await NotificationService.getUsersNewNotification();
        // console.log("After api call", response)
        if(response.data.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const notification = createAsyncThunk('notification', async (_, { rejectWithValue }) => {
    try{
        const response: any = await NotificationService.getUsersNotification();
        // console.log("After api call", response)
        if(response.data.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const notificationUpdated = createAsyncThunk('notificationUpdated', async (data: string, { rejectWithValue }) => {
    try{
        const response: any = await NotificationService.updateNotification(data);
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
const navSlice = createSlice({
    name: 'navs',
    
    initialState,
    
    reducers: {
        
        toggleSideNav: (state) => {
            state.isOpen = !state.isOpen;
        },

        setActiveNotification: (state, action) => {
            
            state.activeNotification = action.payload

            if(state.newNotifications !== null) {
               
                const newNotifications = [...state.newNotifications]

                const index = newNotifications?.findIndex((notification: any) => notification._id === action.payload)

                state.newNotifications.splice(index)

            }

            if(state.notifications !== null) {

                const notifications = [...state.notifications]

                const index = notifications?.findIndex((notification: any) => notification._id === action.payload)

                state.notifications[index].seen_at = new Date().toISOString();

            }
        }

    },
    
    extraReducers: (builder) => {
        
        builder

        .addCase(newNotification.pending, (state) => {
            
            state.error = null
        
        })
        .addCase(newNotification.fulfilled, (state, action) => {
            
            state.newNotifications = action?.payload?.result;
        
        })
        .addCase(newNotification.rejected, (state, action: any) => {
            
            state.error = action.payload?.message || 'Something went wrong';
        
        })

        .addCase(notification.pending, (state) => {
            
            state.error = null
        
        })
        .addCase(notification.fulfilled, (state, action) => {
            
            state.notifications = action?.payload?.result;
        
        })
        .addCase(notification.rejected, (state, action: any) => {
            
            state.error = action.payload?.message || 'Something went wrong';
        
        })

        .addCase(notificationUpdated.pending, (state) => {
            
            state.error = null
        
        })
        .addCase(notificationUpdated.fulfilled, (state, action) => {
            
            // state.notifications = action?.payload?.result;
        
        })
        .addCase(notificationUpdated.rejected, (state, action: any) => {
            
            state.error = action.payload?.message || 'Something went wrong';
        
        })
    
    }

})

export const {toggleSideNav, setActiveNotification} = navSlice.actions;

export default navSlice.reducer;

//selectors
export const getNavSlice = (state: RootState) => state.nav