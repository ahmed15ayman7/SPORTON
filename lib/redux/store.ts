// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loadReducer from "./loadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    load: loadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
