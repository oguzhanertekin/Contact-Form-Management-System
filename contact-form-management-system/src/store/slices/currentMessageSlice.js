import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const currentMessageSlice = createSlice({
  name: "currentMessage",
  initialState,
  reducers: {
    currentMessage: (state, message) => {
      state.value = message.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentMessage } = currentMessageSlice.actions;

export default currentMessageSlice.reducer;
