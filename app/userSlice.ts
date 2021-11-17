import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userId: string | null;
  userRole: string | null;
}

const userInitialState: User = {
  userId: null,
  userRole: null,
};

const userSlice = createSlice({
  name: "User",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.userId = action.payload.userId;
      state.userRole = action.payload.userRole;
    },
    clearUser(state) {
      state.userId = null;
      state.userRole = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
