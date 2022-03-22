import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: {
    token: "",
    isAuth: false,
  },
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.token = "";
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
