import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from 'src/services/productService';

const initialState = {
  products: [],
  productDetail: {},
  pagination: {
    _page: '',
    _limit: 8,
    _total: 8
  },
  q: '',
  params: {}
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params = {}) => {
  const response = await productService.getProducts({
    ...params
  });
  return {
    data: response.data,
    total: response.headers.get('X-Total-Count')
  };
});

export const fetchProductDetail = createAsyncThunk('products/fetchProductDetail', async (id) => {
  const response = productService.getProductDetail(id);
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        _page: action.payload
      };
    },

    setSearchKey: (state, action) => {
      state.q = action.payload;
      console.log(action.payload, 'aa');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.pagination._total = action.payload.total;
    });

    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
  }
});

export const { setNewPage, setSearchKey } = productSlice.actions;
export const productReducer = productSlice.reducer;
