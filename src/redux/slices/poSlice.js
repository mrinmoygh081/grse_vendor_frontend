import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  po: null,
  poType: null,
};

export const selectedPO = createSlice({
  name: "selectedPO",
  initialState,
  reducers: {
    poHandler: (state, action) => {
      state.po = action.payload?.poNumber;
      state.poType = action.payload?.poType;
    },
    poRemoveHandler: (state, action) => {
      state.po = null;
      state.poType = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { poHandler, poRemoveHandler } = selectedPO.actions;

export default selectedPO.reducer;
