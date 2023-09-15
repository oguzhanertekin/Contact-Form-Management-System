import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/authSlice";
import logReducer from "./slices/logSlice";
import currentUserReducer from "./slices/currentUserSlice";
import currentMessageReducer from "./slices/currentMessageSlice";
import themeReducer from "./slices/themeSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    log: logReducer,
    currentUser: currentUserReducer,
    currentMessage: currentMessageReducer,
    theme: themeReducer,
    language: languageReducer,
  },
});
