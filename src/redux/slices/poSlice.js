import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  po: null,
};

export const selectedPO = createSlice({
  name: "selectedPO",
  initialState,
  reducers: {
    poHandler: (state, action) => {
      state.po = action.payload;
    },
    poRemoveHandler: (state, action) => {
      state.po = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { poHandler, poRemoveHandler } = selectedPO.actions;

export default selectedPO.reducer;
