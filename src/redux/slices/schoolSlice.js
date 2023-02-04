import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { header } from "../../helpers/authHelp";
import { API_URL } from "../../api/Api_index";
export const fetchSchool = createAsyncThunk(
  "schoolSlice/fetchSchool",
  async () => {
    const response = await fetch(`${API_URL}/school`);
    const data = await response.json();
    return data;
  }
);
export const fetchUsers = createAsyncThunk(
  "schoolSlice/fetchUsers",
  async () => {
    const response = await fetch(`${API_URL}/users`);
    const data = await response.json();
    return data;
  }
);
export const fetchSchedule = createAsyncThunk(
  "schoolSlice/fetchSchedule",
  async () => {
    const response = await fetch(`${API_URL}/schedule`);
    const data = await response.json();
    return data;
  }
);

export const addSchedule = createAsyncThunk(
  "schoolSlice/addSchedule",
  async (data) => {
    axios.post(`${API_URL}/schedule`, data, {
      headers: { "Content-Type": "application/json", Authorization: header },
    });
  }
);
export const deleteSchedule = createAsyncThunk(
  "schoolSlice/deleteSchedule",
  async (id) => {
    axios.delete(`${API_URL}/schedule/${id}`, {
      headers: { Authorization: header },
    });
  }
);
export const postContact = createAsyncThunk(
  "schooleSlice/postContact",
  async (data) => {
    axios.post(`${API_URL}/contacts`, data, {
      headers: { "Content-Type": "application/json", Authorization: header },
    });
  }
);
export const fetchContact = createAsyncThunk(
  "schooleSlice/fetchContact",
  async () => {
    const res = await axios.get(`${API_URL}/contacts`, {
      headers: { "Content-Type": "application/json", Authorization: header },
    });
    const data = res.data;
    return data;
  }
);
const schoolSlice = createSlice({
  name: "schoolSlice",
  initialState: {
    isLoading: false,
    school: [],
    users: [],
    schedule: [],
    singleSchedule: [],
    contacts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // ? School
    builder.addCase(fetchSchool.fulfilled, (state, action) => {
      state.isLoading = false;
      state.school = action.payload;
      return state;
    });
    builder.addCase(fetchSchool.pending, (state) => {
      state.isLoading = true;
    });
    // ? Users
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      return state;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    // ? Schedule
    builder.addCase(fetchSchedule.fulfilled, (state, action) => {
      state.isLoading = false;
      state.schedule = action.payload;
      return state;
    });
    builder.addCase(fetchSchedule.pending, (state) => {
      state.isLoading = true;
    });
    // ? postContact
    builder.addCase(postContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
      return state;
    });
    builder.addCase(postContact.pending, (state) => {
      state.isLoading = true;
    });

    // ? Fetch Contact
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
      return state;
    });
    builder.addCase(fetchContact.pending, (state) => {
      state.isLoading = true;
    });
  },
});
// export const { deleteUser } = schoolSlice.actions;
export default schoolSlice.reducer;
