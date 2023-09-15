import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    currentUser: (state, user) => {
      state.value = user.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
