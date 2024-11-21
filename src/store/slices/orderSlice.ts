import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { OrderService } from "@/services/OrderService";

const initialState:any = {
    orderResult: null,
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk<any, any>(
    "product/fetchAllProducts",
    async (payload, {rejectWithValue}) => {
        try {
            const response:any = await OrderService.getOrders(payload);

            if (response?.data.status === "Failed"){
                return rejectWithValue(response?.data)
            }else{
                return response?.data
            }
        }catch (err:any){
            return rejectWithValue(err)
        }
       
    }
);

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
             state.loading = false;
             state.orderResult = action.payload.result;
                // state.products.all = action.payload.result;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "something went wrong";
            });
    }
});


export default orderSlice.reducer;

export const getOrderSlice = (state: RootState) => state.order

