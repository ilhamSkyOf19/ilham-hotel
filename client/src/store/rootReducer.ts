import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import BookingSlice from "./bookingSlice";

const rootReducer = combineReducers({ user: UserSlice, booking: BookingSlice });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
