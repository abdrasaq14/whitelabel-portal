import { InventorySlice, UserSlice } from '@/interfaces/SliceInterfaces';
import { Otp, UserLogin } from '@/interfaces/AppInterfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {AuthService} from '@/services/AuthService'; 
import { RootState } from '../store';
import { InventoryService } from '@/services/InventoryService';
  
//initial state
const initialState: InventorySlice = {
    loading: false,
    error: null,
    inventoriesResult: null,
    inventoryRequestResult: null,
    requestHistoryResult: null,
};

//Actions
export const inventoryCreated = createAsyncThunk('createInventory', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.createInventory(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const allInventoryFetched = createAsyncThunk('allInventoryFetched', async (_, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.getInventories({page: 1, limit: 10});
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const allInventoryRequests = createAsyncThunk('allInventoryRequests', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.getAllInventoryRequests({history: false, whiteLabelName: data?.whiteLabelName,  page: 1, limit: 10});
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const allRequestHistory = createAsyncThunk('allRequestHistory', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.getAllRequestHistory({history: true, whiteLabelName: data?.whiteLabelName,  page: 1, limit: 10});
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const addInventoryCategory = createAsyncThunk('addInventoryCategory', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.addInventoryCategory(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const updateInventoryRequest = createAsyncThunk('updateInventoryRequest', async (data: any, { rejectWithValue }) => {
    try{
        const response: any = await InventoryService.updateInventoryRequest(data);
        // console.log("After api call", response)
        if(response?.data?.status === 'Failed'){
            return rejectWithValue(response.data)
        }
        return response?.data;
    }catch(error: any) {
        return rejectWithValue(error);
    }
});

export const updateInventory = createAsyncThunk('updateInventory', async (data: any, { rejectWithValue }) => {
    try{
        const inventoryId = data?.inventoryId;
        const dataCopy = {...data}
        delete dataCopy?.inventoryId;
        const response: any = await InventoryService.updateInventory(inventoryId, dataCopy);
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
const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        // setOtpValue: (state, action) => {
        //     state.otp = action.payload
        // }
    },
    extraReducers: (builder) => {
        builder

        .addCase(inventoryCreated.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(inventoryCreated.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(inventoryCreated.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(allInventoryFetched.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(allInventoryFetched.fulfilled, (state, action) => {
            state.loading = false;
            state.inventoriesResult = action?.payload?.result;
        })
        .addCase(allInventoryFetched.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(allInventoryRequests.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(allInventoryRequests.fulfilled, (state, action) => {
            state.loading = false;
            // console.log("Inventory Request result", action?.payload?.result)
            state.inventoryRequestResult = action?.payload?.result;
        })
        .addCase(allInventoryRequests.rejected, (state, action: any) => {
            state.loading = false;
            state.inventoryRequestResult = null;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(allRequestHistory.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(allRequestHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.requestHistoryResult = action?.payload?.result;
        })
        .addCase(allRequestHistory.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(addInventoryCategory.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(addInventoryCategory.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(addInventoryCategory.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(updateInventoryRequest.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(updateInventoryRequest.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateInventoryRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

        .addCase(updateInventory.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(updateInventory.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(updateInventory.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.payload?.message || 'Something went wrong';
        })

    }
})

// export const {setOtpValue} = authSlice.actions;

export default inventorySlice.reducer;

//selectors
export const getInventorySlice = (state: RootState) => state.inventory