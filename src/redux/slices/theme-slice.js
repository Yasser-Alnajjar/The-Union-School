import { createSlice } from "@reduxjs/toolkit";

let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: dark ? "dark" : "light",
  },
  reducers: {
    setDarkTheme(state) {
      state.mode = "dark";
    },
    setDefaultTheme(state) {
      state.mode = "light";
    },
  },
});
export const { setDarkTheme, setDefaultTheme } = themeSlice.actions;

export default themeSlice.reducer;
