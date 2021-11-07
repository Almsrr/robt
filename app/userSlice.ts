import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username: string | null;
  email: string | null;
}

const userInitialState: User = {
  username: null,
  email: null,
};

const userSlice = createSlice({
  name: "User",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
