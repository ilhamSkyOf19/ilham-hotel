import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

// store
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
