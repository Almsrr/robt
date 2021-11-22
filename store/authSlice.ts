import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ThunkAction } from "redux-thunk";
import { ActionCreator, AnyAction } from "redux";
import { RootState } from ".";

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

// export const loginUser: ActionCreator<
//   ThunkAction<void, RootState, unknown, AnyAction>
// > =
//   ({ token, name, username, email }) =>
//   (dispatch) => {
//     dispatch(login(token));
//     dispatch(
//       setUser({
//         name,
//         username,
//         email,
//       })
//     );
//   };

// export const loginUSER: ThunkAction<void, RootState, unknown, AnyAction> = (
//   dispatch
// ) => {
//   dispatch(login());
// };

export default AuthSlice.reducer;
