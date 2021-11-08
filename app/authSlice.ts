import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { ActionCreator, AnyAction } from "redux";
import { RootState } from "./store";
import { setUser } from "./userSlice";

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
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
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
