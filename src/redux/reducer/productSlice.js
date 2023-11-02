import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from 'src/services/productService';

const initialState = {
  productsHomePage: [],
  products: [],
  productDetail: {},
  pagination: {
    _page: 1,
    _limit: 8,
    _total: 8
  },
  q: '',
  _sort: '',
  _order: '',
  productFor: '',
  category: '',
  size: '',
  color: '',
  material: '',
  originalPrice_gte: 0,
  originalPrice_lte: 999999999999999,
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

export const fetchProductsHomePage = createAsyncThunk('products/fetchProductsHomePage', async () => {
  const { data } = await productService.getProducts();
  return data;
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
    },

    actSetSortPrice: (state, action) => {
      state._sort = 'originalPrice';
      state._order = action.payload;
    },

    setProductFor: (state, action) => {
      switch (action.payload) {
        case 'Nam':
          state.productFor = 'man';
          break;
        case 'Nữ':
          state.productFor = 'woman';
          break;
        case 'Bé trai':
          state.productFor = 'childrenBoy';
          break;
        case 'Bé gái':
          state.productFor = 'childrenGirl';
          break;
        default:
          state.productFor = '';
          break;
      }
    },

    actSetCategory: (state, action) => {
      state.category = action.payload;
    },

    actSetSize: (state, action) => {
      state.size = action.payload;
    },

    actSetColor: (state, action) => {
      state.color = action.payload;
    },

    actSetFilterPrice: (state, action) => {
      switch (action.payload) {
        case '< 200.000':
          state.originalPrice_gte = 0;
          state.originalPrice_lte = 200000;
          break;
        case '200.000 - 500.000':
          state.originalPrice_gte = 200000;
          state.originalPrice_lte = 500000;
          break;
        case '500.000 - 1.000.000':
          state.originalPrice_gte = 500000;
          state.originalPrice_lte = 1000000;
          break;
        case '> 1.000.000':
          state.originalPrice_gte = 1000000;
          state.originalPrice_lte = 999999999999999;
          break;
        default:
          state.originalPrice_gte = 0;
          state.originalPrice_lte = 999999999999999;
          break;
      }
    },

    actClearFilter: (state) => {
      state.q = '';
      state._sort = '';
      state._order = '';
      state.productFor = '';
      state.category = '';
      state.size = '';
      state.color = '';
      state.material = '';
      state.originalPrice_gte = 0;
      state.originalPrice_lte = 999999999999999;
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

    builder.addCase(fetchProductsHomePage.fulfilled, (state, action) => {
      state.productsHomePage = action.payload;
    });
  }
});

export const {
  setNewPage,
  setSearchKey,
  actSetSortPrice,
  setProductFor,
  actSetCategory,
  actSetSize,
  actSetColor,
  actSetFilterPrice,
  actClearFilter
} = productSlice.actions;
export const productReducer = productSlice.reducer;
