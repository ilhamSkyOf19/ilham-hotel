import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PayloadType } from "../models/auth-model";

// type user state
const initialState: Pick<PayloadType, "email" | "fullName" | "role"> = {
  email: "",
  fullName: "",
  role: "customer",
};

// create user slice
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<
        Partial<Pick<PayloadType, "email" | "fullName" | "role">>
      >
    ) => {
      Object.assign(state, action.payload ?? {});
    },
    logout: () => ({ ...initialState }),
  },
});

export const { setUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
