import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import axios from "axios";

import API from "../../utils/axios";
import { STORAGE_KEY_CONSTANT, USER_KEY_CONSTANT } from "../../utils/constants";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../../config/${env}.config`);

export interface LoginState {
  status: "idle" | "loading" | "failed";
  error: string | null;
  userDetails: any;
}

const initialState: LoginState = {
  status: "idle",
  error: null,
  userDetails: {},
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", payload);
      const { data: userResponse } = await axios.get(
        `${config.REACT_APP_API_HOST}/auth/user-details`,
        {
          headers: { "x-access-token": response.data.data.accessToken },
        }
      );
      return {
        accessToken: response.data.data.accessToken,
        user: { ...userResponse.data, role: userResponse.data.role.role },
      };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/logout");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        localStorage.setItem(STORAGE_KEY_CONSTANT, action.payload.accessToken);
        localStorage.setItem(
          USER_KEY_CONSTANT,
          JSON.stringify(action.payload.user)
        );
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        localStorage.removeItem(STORAGE_KEY_CONSTANT);
        localStorage.removeItem(USER_KEY_CONSTANT);
        window.location.replace('/login');
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        if(action.payload === "User Not Found! Invalid Token"){
          localStorage.clear();
          window.location.replace('/login')
        }
        state.status = "failed";
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default loginSlice.reducer;
