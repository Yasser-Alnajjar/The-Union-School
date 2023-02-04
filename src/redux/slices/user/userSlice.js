import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../../api/Api_index";
import { header } from "../../../helpers/authHelp";

export const registerAction = createAsyncThunk(
  "user-slice/register",
  async (payload) => {
    return fetch(`${API_URL}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          toast.success("success");
        } else toast.warn(data);
      });
  }
);
export const getMembers = () => {
  return fetch(`${API_URL}/members`).then((res) => res.json());
};

export const userData = createAsyncThunk("user-slice/userData", async (id) => {
  const res = await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: header,
    },
  });
  const data = res.data;
  return data;
});
export const loginAction = createAsyncThunk(
  "user-slice/login",
  async (payload) => {
    return fetch(`${API_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
          toast.success("success");
          window.location.href = "/";
        } else toast.warn(data);
      });
  }
);

const initialState = {
  isLoading: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      localStorage.removeItem("user");
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    // ? Register Action
    builder.addCase(registerAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      return state;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ? Login Action
    builder.addCase(loginAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      return state;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
    });

    // ? LoginAction
    builder.addCase(userData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      return state;
    });
    builder.addCase(userData.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
