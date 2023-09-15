import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedValue: false,
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    logged: (state, logStatus) => {
      state.loggedValue = logStatus;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logged } = logSlice.actions;

export default logSlice.reducer;
