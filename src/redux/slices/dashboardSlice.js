import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { API_URL } from "../../api/Api_index";
import { header } from "../../helpers/authHelp";

export const allClassData = createAsyncThunk(
  "dashboard/classData",
  async () => {
    try {
      const res = await fetch(`${API_URL}/classes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: header,
        },
      });
      const data = res.json();
      return data;
    } catch (err) {
      if (err.response.data === "jwt expired") {
        localStorage.removeItem("user");
      }
    }
  }
);
export const userClasses = createAsyncThunk(
  "dashboard/userClasses",
  async (id) => {
    try {
      const res = await fetch(`${API_URL}/classes?userId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: header,
        },
      });
      const data = res.json();
      return data;
    } catch (err) {
      if (err.response.data === "jwt expired") {
        localStorage.removeItem("user");
      }
    }
  }
);

export const postData = createAsyncThunk("dashboard/postData", async (data) => {
  fetch(`${API_URL}/classes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: header,
    },
    body: JSON.stringify(data),
  });
});
const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    isLoading: false,
    dashboard: [],
    userClasses: [],
  },

  extraReducers: (builder) => {
    builder.addCase(allClassData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allClassData.rejected, (state) => {
      toast.error("Error rejected to fetch data");
    });
    builder.addCase(allClassData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dashboard = action.payload;
      return state;
    });
    builder.addCase(userClasses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userClasses.rejected, (state) => {
      toast.error("Error rejected to fetch data");
    });
    builder.addCase(userClasses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userClasses = action.payload;
      return state;
    });
  },
});
export const { getAllClasses } = dashboardSlice.actions;
export default dashboardSlice.reducer;
