import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authUser: (state, user) => {
      state.value = user.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { authUser } = authSlice.actions;

export default authSlice.reducer;
