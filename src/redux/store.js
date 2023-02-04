import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";
import schoolSlice from "./slices/schoolSlice";
import themeSlice from "./slices/theme-slice";
import userSlice from "./slices/user/userSlice";

export const store = configureStore({
  reducer: {
    getSchool: schoolSlice,
    authUser: userSlice,
    dashboard: dashboardSlice,
    theme: themeSlice,
  },
  devTools: false,
});
