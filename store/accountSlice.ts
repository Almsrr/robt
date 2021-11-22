import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Account {
  id: string | null;
  role: string | null;
}

const accountInitialState: Account = {
  id: null,
  role: null,
};

const accountSlice = createSlice({
  name: "Account",
  initialState: accountInitialState,
  reducers: {
    setAccount(state, action: PayloadAction<Account>) {
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
