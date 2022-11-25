import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";

import API from "../../utils/axios";

const CryptoJS = require("crypto-js");

const env = process.env.REACT_APP_ENV;
const { config } = require(`../../config/${env}.config`);

export interface forgetPasswordState {
  emailStatus: "idle" | "loading" | "failed";
  otpStatus: "idle" | "loading" | "failed";
  error: string | null;
  userId: string;
}

const initialState: forgetPasswordState = {
  emailStatus: "idle",
  otpStatus: "idle",
  error: null,
  userId: "",
};

export const verifyEmailAsync = createAsyncThunk(
  "verifyEmail/forgetPassword",
  async (payload: string, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user/forgot?email=${payload}`);
      if (response.data.status === "success")
        notification.success({ message: response.data?.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const verifyOtpAsync = createAsyncThunk(
  "verifyOtp/forgetPassword",
  async (payload: any, { rejectWithValue }) => {
    try {
      const body = {
        email: payload?.email,
        otp: CryptoJS.AES.encrypt(
          payload?.otp,
          config.CRYPTO_SECRET
        ).toString(),
      };
      const response = await API.post("/user/verifyotp", body);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmailAsync.pending, (state) => {
        state.emailStatus = "loading";
      })
      .addCase(verifyEmailAsync.fulfilled, (state, action) => {
        state.emailStatus = "idle";
        // state.passwordChanged = true;
        // state.data = action?.payload;
      })
      .addCase(verifyEmailAsync.rejected, (state, action) => {
        state.emailStatus = "failed";
      });
    builder
      .addCase(verifyOtpAsync.pending, (state) => {
        state.otpStatus = "loading";
      })
      .addCase(verifyOtpAsync.fulfilled, (state, action) => {
        state.otpStatus = "idle";
        state.userId = action?.payload?.data?.userid;
      })
      .addCase(verifyOtpAsync.rejected, (state, action) => {
        state.otpStatus = "failed";
      });
  },
});

export const forgotPassword = (state: RootState) => state.forgotPassword;

export default forgotPasswordSlice.reducer;
