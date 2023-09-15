import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    theme: (state, themeOption) => {
      state.theme = themeOption.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { theme } = themeSlice.actions;

export default themeSlice.reducer;
