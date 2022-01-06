import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Account from "../models/Account";

export type AccountState = Pick<Account, "id" | "role">;

const accountInitialState: AccountState = {
  id: "",
  role: "",
};

const accountSlice = createSlice({
  name: "Account",
  initialState: accountInitialState,
  reducers: {
    setAccount(state, action: PayloadAction<AccountState>) {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    clearAccount(state) {
      state.id = "";
      state.role = "";
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
