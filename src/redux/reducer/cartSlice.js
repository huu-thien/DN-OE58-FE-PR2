import { createSlice } from '@reduxjs/toolkit';

const KEY_CARTS_LIST = 'key_carts_list';
const initialState = {
  carts: JSON.parse(localStorage.getItem(KEY_CARTS_LIST)) || []
};

const cartSlice = createSlice({
  name: 'carts',
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
      const cartItem = action.payload;
      if (!state.carts.length) {
        state.carts.push(cartItem);
      } else {
        const existedIndexCartItem = state.carts.findIndex(
          (cart) =>
            cart.idProduct === cartItem.idProduct && cart.color === cartItem.color && cart.size === cartItem.size
        );

        if (existedIndexCartItem + 1) {
          state.carts[existedIndexCartItem].quantity += cartItem.quantity;
        } else {
          state.carts.push(cartItem);
        }
      }
      // state.carts = action.payload;
      localStorage.setItem(KEY_CARTS_LIST, JSON.stringify(state.carts));
    }
  }
});

export const { addCartItem, deleteCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
