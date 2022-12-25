import { configureStore } from "@reduxjs/toolkit";
// import { IStoreInitialState } from "../models/dataModels";
import dataSlice from "./dataSlice";

let onlineStoreData;

try {
  if (localStorage.getItem("OnlineStoreData")) {
    onlineStoreData = JSON.parse(localStorage.getItem("OnlineStoreData") || "");
  }
} catch {}

export const store = configureStore({
  reducer: {
    onlineStoreData: dataSlice,
  },
  preloadedState: {
    onlineStoreData,
  },
});
store.subscribe(() => {
  localStorage.setItem(
    "OnlineStoreData",
    JSON.stringify(store.getState().onlineStoreData)
  );
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
