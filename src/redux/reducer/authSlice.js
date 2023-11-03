import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

// create thunk

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveLogin: (state, action) => {
      state.user = action.payload;
    },
    saveLogout: (state) => {
      state.user = null;
    },
    setInfoUserUpdate: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: {}
});

export const { saveLogin, saveLogout, setInfoUserUpdate } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
