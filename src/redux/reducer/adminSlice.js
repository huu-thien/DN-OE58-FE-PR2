import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accountEdit: null
};

// create thunk

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: {}
});

const adminReducer = adminSlice.reducer;
export default adminReducer;
