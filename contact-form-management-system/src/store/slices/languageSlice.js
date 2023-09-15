import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "TR",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    language: (state, languageOption) => {
      state.language = languageOption.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { language } = languageSlice.actions;

export default languageSlice.reducer;
