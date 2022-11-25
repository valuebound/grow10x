import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";

import API from "../../utils/axios";

export interface settingState {
  status: "idle" | "loading" | "failed";
  error: string | null;
  passwordChanged: boolean;
}

const initialState: settingState = {
  status: "idle",
  error: null,
  passwordChanged: false,
};

export const changePasswordAsync = createAsyncThunk(
  "changePassword/setting",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.put(`user/changepassword`, payload);
      if (response.data.status === "success")
        notification.success({ message: response.data?.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordChanged = true;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const setting = (state: RootState) => state.setting;

export default settingSlice.reducer;
