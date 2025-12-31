import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";

const rootReducer = combineReducers({ user: UserSlice });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
