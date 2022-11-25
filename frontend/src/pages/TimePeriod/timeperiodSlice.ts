import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import API from "../../utils/axios";
import { RootState } from "../../redux/store";

export interface timeperiodState {
  data: any;
  status: "idle" | "loading" | "failed";
  errors: null;
}

const initialState: timeperiodState = {
  data: [],
  status: "idle",
  errors: null,
};

export const getAllTimePeriodsAsync = createAsyncThunk(
  "timePeriod/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(`timeperiod`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const updateTimePeriodsAsync = createAsyncThunk(
  "timePeriod/update",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await API.patch(`timeperiod/update/${data._id}`, data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const deleteTimePeriodsAsync = createAsyncThunk(
  "timePeriod/delete",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await API.delete(`timeperiod/delete/${data._id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const createTimePeriodsAsync = createAsyncThunk(
  "timePeriod/createTimePeriod",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await API.post(`timeperiod/create`, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const timeperiodSlice = createSlice({
  name: "timePeriod",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAllTimePeriodsAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getAllTimePeriodsAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload.data;
      })
      .addCase(getAllTimePeriodsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });

    builder
      .addCase(updateTimePeriodsAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateTimePeriodsAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        notification.success({ message: "Updated time period successfully" });
      })
      .addCase(updateTimePeriodsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });

    builder
      .addCase(createTimePeriodsAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(createTimePeriodsAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        notification.success({ message: "Created time period successfully" });
      })
      .addCase(createTimePeriodsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });

    builder
      .addCase(deleteTimePeriodsAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deleteTimePeriodsAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        notification.success({ message: "Deleted time period successfully" });
      })
      .addCase(deleteTimePeriodsAsync.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });
  },
});

export const selectTime = (state: RootState) => state.timePeriod;

export default timeperiodSlice.reducer;
