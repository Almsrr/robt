import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import accountSlice from "./accountSlice";
import { getLocaleAccount } from "../app/locale-functions";
import { login } from "./authSlice";
import { setAccount } from "./accountSlice";

const store = configureStore({
  reducer: { auth: authReducer, account: accountSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

//If page refresh keep account authenticated
const localAccount = getLocaleAccount();
// console.log(localAccount);

if (localAccount) {
  store.dispatch(login({ token: localAccount.token }));
  store.dispatch(
    setAccount({ id: localAccount.accountId, role: localAccount.accountRole })
  );
}

export default store;
