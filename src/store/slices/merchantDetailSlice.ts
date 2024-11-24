import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { MerchantService } from "@/services/merchant";
import { ISuspendMerchantPayload } from "@/interfaces/ComponentInterfaces";
import toast from "react-hot-toast";

const initialState = {
    merchant: {} as any,
    error: undefined as string | undefined,
    loading: false,
}

export const fetchMerchantDetails = createAsyncThunk<any, any>(
    "merchant/fetchMerchantDetails",
    async (merchantId: string) => {
        const response:any = await MerchantService.getMerchantDetails(merchantId);
        return response.data.result;
    }
);

export const suspendMerchant = createAsyncThunk<any, ISuspendMerchantPayload>(
  "merchant/suspendMerchant",
  async (values: ISuspendMerchantPayload) => {
    const response: any = await MerchantService.suspendMerchant({action: values.action, platform: values.platform, reason: values.reason}, values.merchantId);
    return response.data.result;
  }
);

export const merchantDetailSlice = createSlice({
    name: "merchantDetail",
    initialState,
    reducers: {
        clearMerchantDetail: (state) => {
            state.merchant = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMerchantDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMerchantDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.merchant = action.payload;
        });
        builder.addCase(fetchMerchantDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = "An error occured";
        });

        builder.addCase(suspendMerchant.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(suspendMerchant.fulfilled, (state, action) => {
            state.loading = false;
            state.merchant = action.payload;
        });
        builder.addCase(suspendMerchant.rejected, (state, action) => {
            state.loading = false;
            state.error = "An error occured";
           
        });
    }
});

export const { clearMerchantDetail } = merchantDetailSlice.actions;
export default merchantDetailSlice.reducer;
// Selectors
export const selectMerchantDetail = (state: RootState) => state.merchantDetail