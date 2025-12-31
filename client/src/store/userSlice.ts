import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "../models/auth-model";

// type transaction state
const initialState: PayloadType = {
  _id: "",
  email: "",
  fullName: "",
  isActive: false,
  role: "customer",
  createAt: "",
  updatedAt: "",
};

// create transaction slice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<PayloadType>>) => {
      Object.assign(state, action.payload ?? {});
    },
    logout: () => ({ ...initialState }),
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
