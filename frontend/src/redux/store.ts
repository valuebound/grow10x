import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import login from "../pages/Login/loginSlice";
import timePeriod from "../pages/TimePeriod/timeperiodSlice";
import okr from "../pages/OKR/okrSlice";
import organization from "../pages/Organization/organizationSlice";
import setPassword from "../pages/SetPassword/setPasswordSlice";
import dashboard from "../pages/Home/dashboardSlice";
import people from "../pages/People/peopleSlice";
import notification from "../pages/TimePeriod/notificationsSlice";
import profile from "../pages/Profile/profileSlice";
import setting from "../pages/Setting/settingSlice";
import forgotPassword from "../pages/ForgotPassword/forgotPasswordSlice"

export const store = configureStore({
  reducer: {
    auth: login,
    dashboard,
    timePeriod,
    notification,
    okr,
    organization,
    setPassword,
    people,
    profile,
    setting,
    forgotPassword
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
