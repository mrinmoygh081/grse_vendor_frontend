import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
};

export const loginStage = createSlice({
  name: "loginStage",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.token = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    logoutHandler: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginHandler, logoutHandler } = loginStage.actions;

export default loginStage.reducer;
