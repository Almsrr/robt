import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  id: string | null;
  role: string | null;
}

const accountInitialState: AccountState = {
  id: null,
  role: null,
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
      state.id = null;
      state.role = null;
    },
  },
});

export const { setAccount, clearAccount } = accountSlice.actions;

export default accountSlice.reducer;
