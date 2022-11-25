import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";

import API from "../../utils/axios";

export interface setPasswordState {
  value: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
  userDetails: any;
  passwordChanged: boolean;
}

const initialState: setPasswordState = {
  value: 0,
  status: "idle",
  error: null,
  userDetails: {},
  passwordChanged: false,
};

export const setPasswordAsync = createAsyncThunk(
  "setPassword/changePassword",
  async (payload: any, { rejectWithValue }) => {
    const id = payload?.id || "";
    const type = payload?.type || "";
    try {
      const response = await API.put(
        `/user/${id}/setpassword?type=${type}`,
        payload.inputData
      );
      if (response.data.status === "success")
        notification.success({ message: response.data?.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const setPasswordSlice = createSlice({
  name: "setPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordChanged = true;
      })
      .addCase(setPasswordAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const setPassword = (state: RootState) => state.setPassword;

export default setPasswordSlice.reducer;
