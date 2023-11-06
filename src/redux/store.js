import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authSlice';
import { productReducer } from './reducer/productSlice';
import { cartReducer } from './reducer/cartSlice';

import { productReducer } from './reducer/productSlice';
import adminReducer from './reducer/adminSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
  }
});
