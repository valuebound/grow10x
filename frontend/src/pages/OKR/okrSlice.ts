import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../redux/store";
import axios from "../../utils/axios";
import { currentUser, OKR_TYPE } from "../../utils/constants";

export interface okrSliceState {
  data: any;
  aboutData: any;
  companyData: any;
  companyDataList: any,
  updateCompanyOkrs: any;
  detailsData: any;
  timePeriods: any[];
  activityFeed: any;
  statusAF: "idle" | "loading" | "failed";
  userData: any[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

type OkrProps = {
  query?: string;
  quarter?: string;
  owner?: string;
};

export const createOkrAsync = createAsyncThunk(
  "okr/create",
  async (payload: any, { rejectWithValue }) => {
    try {
      await axios.post(`/okr`, payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getIndividualOkrsAsync = createAsyncThunk(
  "okr/getIndividualOkrs",
  async ({ quarter, owner }: OkrProps, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/okr`, {
        params: {
          owner: owner || currentUser.userid,
          type: OKR_TYPE.Individual,
          quarter,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyOkrsAsync = createAsyncThunk(
  "okr/getCompanyOkrs",
  async ({ quarter }: OkrProps, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/okr`, {
        params: {
          owner: currentUser.userid,
          type: OKR_TYPE.CompanyWide,
          quarter,
        },
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getKrFeedbacksAsync = createAsyncThunk(
  "okr/getAllKrFeedbacks",
  async ({ krsId }: { krsId: string }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/activityfeed/${krsId}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOkrByIdsync = createAsyncThunk(
  "okr/getOkrById",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/okr/${id}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOkrAsync = createAsyncThunk(
  "okr/update",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/okr/${payload?.id}`, payload);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompanyOkrAsync = createAsyncThunk(
  "okr/updateCompanyOkr",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/okr/${payload?.id}`, payload);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const commentOnOkrAsync = createAsyncThunk(
  "okr/comment",
  async (
    { krsId, text }: { krsId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(`/okr/addcomment/${krsId}`, {
        comment: {
          text,
          commentedBy: currentUser?.userid,
        },
      });
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkInkrAsync = createAsyncThunk(
  "okr/checkIn",
  async (
    {
      comment,
      current,
      krId,
    }: { comment: string; current: number; krId: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(`/okr/checkin/${krId}`, {
        comment: {
          text: comment,
          commentedBy: currentUser?.userid,
        },
        currentValue: current,
      });
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCommentOnOkrAsync = createAsyncThunk(
  "okr/updateComment",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/okr/updatecomment/${payload?.id}`, payload);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteOkrAsync = createAsyncThunk(
  "okr/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/okr/deleteokr/${id}`);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCompanyAbout = createAsyncThunk(
  "okr/getAbout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/myorganization/company/details`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCompanyAbout = createAsyncThunk(
  "okr/updateAbout",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `/myorganization/company/updatedetails`,
        payload
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompanyLogo = createAsyncThunk(
  "okr/updateLogo",
  async (logo: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/myorganization/logo/${logo}`);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUser = createAsyncThunk(
  "user/searchUser",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/user/search`, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUserOkr = createAsyncThunk(
  "/okr/search",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`/okr/search`, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: okrSliceState = {
  data: { okrs: [] },
  companyData: { okrs: [] },
  companyDataList: { okrs: [] },
  aboutData: {},
  updateCompanyOkrs: { okrs: [] },
  detailsData: {},
  timePeriods: [],
  userData: [],
  activityFeed: { activity: [] },
  statusAF: "idle",
  status: "idle",
  error: null,
};

export const okrSlice = createSlice({
  name: "okr",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIndividualOkrsAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getIndividualOkrsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload.data;
      })
      .addCase(getIndividualOkrsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(getCompanyOkrsAsync.pending, (state, action) => {
        // state.status = "loading";
      })
      .addCase(getCompanyOkrsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyData = action.payload.data;
      })
      .addCase(getCompanyOkrsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(getOkrByIdsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOkrByIdsync.fulfilled, (state, action) => {
        state.status = "idle";
        const okrData = {
          ...action.payload.data,
          ...action.payload.data.okrs[0],
        };
        delete okrData.okrs;
        state.detailsData = okrData;
      })
      .addCase(getOkrByIdsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(getKrFeedbacksAsync.pending, (state, action) => {
        state.statusAF = "loading";
      })
      .addCase(getKrFeedbacksAsync.fulfilled, (state, action) => {
        state.statusAF = "idle";
        state.activityFeed = action.payload.data || {};
      })
      .addCase(getKrFeedbacksAsync.rejected, (state, action) => {
        state.statusAF = "failed";
        state.activityFeed = { activity: [] };
        state.error = String(action.payload);
      });

    builder
      .addCase(commentOnOkrAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentOnOkrAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(commentOnOkrAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(updateCompanyAbout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCompanyAbout.fulfilled, (state, action) => {
        state.status = "idle";
        state.aboutData = action.payload.data;
      })
      .addCase(updateCompanyAbout.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });
    builder
      .addCase(deleteCompanyLogo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCompanyLogo.fulfilled, (state, action) => {
        state.status = "idle";
        state.aboutData = action.payload.data;
      })
      .addCase(deleteCompanyLogo.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });
    builder
      .addCase(getCompanyAbout.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompanyAbout.fulfilled, (state, action) => {
        state.status = "idle";
        state.aboutData = action.payload.data;
      })
      .addCase(getCompanyAbout.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });
    builder
      .addCase(updateCompanyOkrAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCompanyOkrAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updateCompanyOkrs = action.payload.data;
      })
      .addCase(updateCompanyOkrAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(searchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userData = action.payload.data;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(searchUserOkr.pending, (state, action) => {
        // state.status = "loading";
      })
      .addCase(searchUserOkr.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyDataList = action.payload.data;
      })
      .addCase(searchUserOkr.rejected, (state, action) => {
        state.status = "failed";
        state.companyDataList = { okrs: [] } ;
        state.error = String(action.payload);
      });
  },
});

export const selectOkr = (state: RootState) => state.okr;

export default okrSlice.reducer;
