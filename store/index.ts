import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountSlice from "./accountSlice";

const store = configureStore({
  reducer: { auth: authReducer, account: accountSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
