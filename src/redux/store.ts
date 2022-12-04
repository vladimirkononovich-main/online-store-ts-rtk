import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

export const store = configureStore({
  reducer: {
    onlineStoreData: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
