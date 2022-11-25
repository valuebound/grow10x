import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import { RootState } from "../../redux/store";
import API from "../../utils/axios";

export interface PeopleState {
  data: any;
  orgChartData: any;
  orgTreeData: any;
  reportingMangerList: any;
  status: "idle" | "loading" | "failed";
  errors: string | null;
}

const initialState: PeopleState = {
  data: [],
  reportingMangerList: [],
  orgChartData: {
    id: "no data found",
    value: { name: "no data" },
    children: [],
  },
  orgTreeData: [],
  status: "idle",
  errors: null,
};

export const addMembers = createAsyncThunk(
  `user`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.post(`/user/`, payload);
      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      if (response.data.status === "error")
        notification.error({
          message: `Account already exists with this email`,
        });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Update Members Profile (Admin)
export const updateMembersProfiles = createAsyncThunk(
  `user/admin`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.put(
        `/user/admin/update/${payload?._id}`,
        payload
      );
      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      else notification.error({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Deactivate Members (Admin)
export const deactivateMembers = createAsyncThunk(
  `user/deactivate`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/user/inactive/${payload}?type=deactivate`
      );
      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getPeople = createAsyncThunk(
  `get/people`,
  async (queryData: any, { rejectWithValue }) => {
    try {
      const { status, page, paginationSize } = queryData;
      const response = await API.get(`/team/members`, {
        params: { status, limit: paginationSize, page: page },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  `users`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const searchUser = createAsyncThunk(
  `people/searchuser`,
  async (data: any, { rejectWithValue }) => {
    try {
      const { page, paginationSize, searchQuery, status } = data;
      const response = await API.get(`user/searchuser`, {
        params: {
          name: searchQuery,
          status,
          limit: paginationSize,
          page: page,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getOrgChartData = createAsyncThunk(
  "OrgChart/getData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/myorganization/org-chart`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const deleteMembers = createAsyncThunk(
  `user/delete`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/user/inactive/${payload}?type=delete`);
      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const activateMembers = createAsyncThunk(
  `user/activate`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.patch(`/user/active/${payload}`);
      if (response.data.status === "success")
        notification.success({ message: response.data.message });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getReportingManagerList = createAsyncThunk(
  "reportingManger/getList",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await API.get("user/reporting-manager-list", {
        params: { user: id },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getOrgTreeData = createAsyncThunk(
  "OrgTree/getData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/myorganization/orgchart-list`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const peopleSlice = createSlice({
  name: "peopleList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMembers.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(addMembers.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(addMembers.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(updateMembersProfiles.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateMembersProfiles.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(updateMembersProfiles.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getPeople.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getPeople.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload.data;
      })
      .addCase(getPeople.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(deactivateMembers.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deactivateMembers.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(deactivateMembers.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getOrgChartData.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getOrgChartData.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.orgChartData = {
          ...action.payload.data,
          children: action.payload.data?.children?.filter(
            (child: any) => child !== null
          ),
        };
      })
      .addCase(getOrgChartData.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getOrgTreeData.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getOrgTreeData.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.orgTreeData = [action.payload?.data];
      })
      .addCase(getOrgTreeData.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(searchUser.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(searchUser.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload.data;
      })
      .addCase(searchUser.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(deleteMembers.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(deleteMembers.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(deleteMembers.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(activateMembers.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(activateMembers.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(activateMembers.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getReportingManagerList.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getReportingManagerList.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.reportingMangerList = action.payload?.data;
      })
      .addCase(getReportingManagerList.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export const selectPeople = (state: RootState) => state.people;

export default peopleSlice.reducer;
