import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    loginToggle: false,
    isDiffRes: false,
  },
  reducers: {
    toggleSearchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
    toggleIsDiffRes: (state) => {
      state.isDiffRes = !state.isDiffRes;
    },
  },
});

export default toggleSlice.reducer;
export const { toggleSearchBar, toggleLogin, toggleIsDiffRes } =
  toggleSlice.actions;
