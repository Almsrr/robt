import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuth: boolean;
}

const authInitialState: AuthState = {
  token: null,
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: authInitialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.token = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
