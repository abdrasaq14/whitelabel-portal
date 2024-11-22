import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IQueryParams } from "@/interfaces/AppInterfaces";
import { RootState } from "../store";
import { ProductService } from "@/services/product";

const initialState = {

  products: {
    all: [],
    blocked: []
  },
  
  total: 0,
  
  loading: false,
  
  error: null

};

export const fetchProducts = createAsyncThunk<any, IQueryParams>(
  
  "product/fetchAllProducts",
  
  async (payload: IQueryParams) => {
  
    const response = await ProductService.fetchAll(payload);

    return {
      //   @ts-ignore
      product: response.data?.result?.results,
  
      status: payload.status,
      //   @ts-ignore
      total: response.data?.result?.totalPages
    };
  }
);

const productSlice = createSlice({
  
  name: "product",
  
  initialState,
  
  reducers: {
  
    setProductError: (state, action) => {
  
      state.error = action.payload;
  
    },
  
    startProductLoading: (state) => {
  
      state.loading = true;
  
    },
  
    stopProductLoading: (state) => {
  
      state.loading = false;
  
    }
  
  },
  
  extraReducers: (builder) => {
  
    builder
  
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
          const { product, status, total } = action.payload;
            if (status === "blocked") {
                state.products.blocked = product;
            } else {
                state.products.all = product;
            }
            state.total = total;
        // state.products.all = action.payload.result;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { setProductError, startProductLoading, stopProductLoading } = productSlice.actions;

export default productSlice.reducer;

export const getProductSlice = (state: RootState) => state.product;