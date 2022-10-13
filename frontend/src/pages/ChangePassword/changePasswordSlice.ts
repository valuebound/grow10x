import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

import API from "../../utils/axios"
import { STORAGE_KEY_CONSTANT } from '../../utils/constants';

export interface ChangePasswordState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: ChangePasswordState = {
  value: 0,
  status: 'idle',
  error: null
};

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.post("/signup", payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        localStorage.setItem(STORAGE_KEY_CONSTANT, action.payload)
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = 'failed';
      });

  },
});

export const selectChangePassword = (state: RootState) => state.auth;

export default changePasswordSlice.reducer;
