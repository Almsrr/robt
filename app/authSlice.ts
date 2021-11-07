import { createSlice } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { ActionCreator, AnyAction } from "redux";
import { RootState } from "./store";
import { setUser, clearUser } from "./userSlice";

interface AuthState {
  token: string;
  isAuth: boolean;
}

const authInitialState: AuthState = {
  token: "",
  isAuth: false,
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: authInitialState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export const loginUser: ActionCreator<
  ThunkAction<void, RootState, unknown, AnyAction>
> = () => (dispatch) => {
  dispatch(login());
  dispatch(setUser({ username: "alam", email: "alam@domain.com" }));
};

export const logoutUser: ActionCreator<
  ThunkAction<void, RootState, unknown, AnyAction>
> = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearUser());
};

// export const loginUSER: ThunkAction<void, RootState, unknown, AnyAction> = (
//   dispatch
// ) => {
//   dispatch(login());
// };

export default AuthSlice.reducer;
