import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import accountReducer from "./account-slice";
import menuReducer from "./menu-slice";

const store = configureStore({
  reducer: { auth: authReducer, account: accountReducer, menu: menuReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
