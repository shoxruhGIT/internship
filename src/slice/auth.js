import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/localstorage";

const initialState = {
  isLoading: false,
  loggidIn: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUserStart: (state) => {
      state.isLoading = true;
    },
    signUserSuccess: (state, action) => {
      state.loggidIn = true;
      state.isLoading = false;
      state.user = action.payload;
      setItem("token", action.payload.token);
    },
    signUserFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logOutUser: (state) => {
      state.user = null;
      state.loggidIn = false;
    },
  },
});

export const { signUserFailure, signUserStart, signUserSuccess, logOutUser } =
  authSlice.actions;

export default authSlice.reducer;
