import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  user: null,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
      state.user= action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
  }
});

export const { login ,logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;