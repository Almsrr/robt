import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { ActionCreator, AnyAction } from "redux";
import { RootState } from "./store";
import { setUser } from "./userSlice";

interface AuthState {
  token: string | null;
  isAuth: boolean;
  username: string | null;
}

const authInitialState: AuthState = {
  token: null,
  isAuth: false,
  username: null,
};

const AuthSlice = createSlice({
  name: "Authentication",
  initialState: authInitialState,
  reducers: {
    login(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.isAuth = true;
      state.username = action.payload.username;
    },
    logout(state) {
      state.isAuth = false;
      state.token = null;
      state.username = null;
    },
  },
});

export const { login, logout } = AuthSlice.actions;

export const loginUser: ActionCreator<
  ThunkAction<void, RootState, unknown, AnyAction>
> =
  ({ token, name, username, email }) =>
  (dispatch) => {
    dispatch(login(token));
    dispatch(
      setUser({
        name,
        username,
        email,
      })
    );
  };

// export const loginUSER: ThunkAction<void, RootState, unknown, AnyAction> = (
//   dispatch
// ) => {
//   dispatch(login());
// };

export default AuthSlice.reducer;
