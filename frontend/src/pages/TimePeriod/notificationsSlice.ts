import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";

import API from "../../utils/axios"
import { currentUser } from "../../utils/constants";

export interface notificationState {
  data: any;
  organisation: any;
  status: "idle" | "loading" | "failed";
  errors: null;
}

const initialState: notificationState = {
  data: [],
  organisation: {},
  status: "idle",
  errors: null,
};


export const updateNotificationAsync = createAsyncThunk(
  "notification/updateNotification",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await API.patch(`myorganization/${currentUser?.organization?._id}/update`, data)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error?.message)
    }

  }
);

export const getOrganisationProfileAsync = createAsyncThunk(
  "notification/getOrganisationProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(`myorganization/profile`)
      return res.data
    } catch (error: any) {
      return rejectWithValue(error?.message)
    }

  }
);

export const notificationSlice = createSlice({
  name: "Notification",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(updateNotificationAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateNotificationAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        if(action.payload.status === "success") notification.success({ message: "Updated settings successfully" })
      })
      .addCase(updateNotificationAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });

    builder
      .addCase(getOrganisationProfileAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getOrganisationProfileAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.organisation = action.payload.data
        
      })
      .addCase(getOrganisationProfileAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });
  },
});

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;