import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import API from "../../utils/axios"
import { RootState } from '../../redux/store';

export interface dashboardSliceState {
  data: any;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  lineChartData: any;
}

const initialState: dashboardSliceState = {
  data: {},
  status: 'idle',
  error: null,
  lineChartData: []
}

export const getDashboardStats = createAsyncThunk(
  "dashboard/overall",
  async (data: any, { rejectWithValue }) => {
    try {
      const { quarter, company } = data;
      const url = company ? "/dashboard/company" : "/dashboard";
      const res = await API.get(url, {
        params: { quarter }
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
export const getLineChartData = createAsyncThunk(
  "lineChart/get",
  async (data: any, { rejectWithValue }) => {
    try {
      const { quarter, company } = data;
      const url = company ? `/okr/checkin/company/summary?quarter=${quarter}` : `/okr/checkin/summary?quarter=${quarter}`;
      // const url = `/okr/checkin/summary?quarter=${quarter}`
      const res = await API.get(url, {
        // params: { quarter }
      })
      return res.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const dashboardSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getDashboardStats.fulfilled, (state, action: any) => {
        state.status = "idle"
        state.data = action.payload?.data
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.status = "failed"
        state.error = String(action.payload)
      })

    builder
      .addCase(getLineChartData.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(getLineChartData.fulfilled, (state, action: any) => {
        state.status = "idle"
        state.lineChartData = action.payload?.data
      })
      .addCase(getLineChartData.rejected, (state, action) => {
        state.status = "failed"
        state.error = String(action.payload)
      })
  }
})

export const selectDashboard = (state: RootState) => state.dashboard;

export default dashboardSlice.reducer;
