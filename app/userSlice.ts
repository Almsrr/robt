import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string | null;
  username: string | null;
  email: string | null;
}

const userInitialState: User = {
  name: null,
  username: null,
  email: null,
};

const userSlice = createSlice({
  name: "User",
  initialState: userInitialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    clearUser(state) {
      state.name = null;
      state.username = null;
      state.email = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
