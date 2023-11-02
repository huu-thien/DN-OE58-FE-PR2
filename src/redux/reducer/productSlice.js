import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from 'src/services/productService';

const initialState = {
  products: [],
  productDetail: {},
  params: {}
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params) => {
  const response = await productService.getProducts({
    ...params
  });
  return response;
});

export const fetchProductDetail = createAsyncThunk('products/fetchProductDetail', async (id) => {
  const response = productService.getProductDetail(id);
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  }
});

export const productReducer = productSlice.reducer;
