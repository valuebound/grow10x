import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { notification } from "antd";

import API from "../../utils/axios";

export interface organizationState {
  value: number;
  status: "idle" | "loading" | "failed";
  error: string | null;
  listOfOrg: any[];
}

const initialState: organizationState = {
  value: 0,
  status: "idle",
  error: null,
  listOfOrg: [],
};

export const getOrganizationListAsync = createAsyncThunk(
  "organization/getOrganization",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/auth/orglist`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createOrganizationAsync = createAsyncThunk(
  "organization/createOrganization",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/orgsignup", payload);
      if(res.data.status !== "success") notification.error({ message: res.data.message })
      return res.data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteOrganizationAsync = createAsyncThunk(
  "organization/deleteOrganization",
  async (id:String, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/auth/delete/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response.status >= 400 && error.response.status <= 503) {
        notification.error({ message: error.response.data?.message || error.response?.statusText })
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrganizationListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.listOfOrg = action.payload.data;
      })
      .addCase(getOrganizationListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload)
      });
      
    builder
      .addCase(createOrganizationAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createOrganizationAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(createOrganizationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload)
      });

    builder
      .addCase(deleteOrganizationAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrganizationAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteOrganizationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload)
      });
  },
});

export const organization = (state: RootState) => state.organization;

export default organizationSlice.reducer;
