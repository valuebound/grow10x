import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";
import API from "../../utils/axios";
import { USER_KEY_CONSTANT } from "../../utils/constants";

export interface ProfileState {
  data: any;
  status: "idle" | "loading" | "failed";
  errors: string | null;
}

const initialState: ProfileState = {
  data: {},
  status: "idle",
  errors: null,
};

const userDetails = JSON.parse(String(localStorage.getItem(USER_KEY_CONSTANT)));

export const getMyProfile = createAsyncThunk(
  `profile`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user/my-profile`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Update Profile (Self)
export const updateSelfProfile = createAsyncThunk(
  `user/update`,
  async (payload: any, { rejectWithValue }) => {
    try {
      let response;
      // if (userDetails?.role === "ADMIN")
      //   response = await API.put(`/user/admin/update/${payload?._id}`, payload);
      response = await API.put(`/user/update/${payload?._id}`, payload);

      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      else notification.error({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getMyProfile.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload.data;
      })
      .addCase(getMyProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });
    builder
      .addCase(updateSelfProfile.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateSelfProfile.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(updateSelfProfile.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
