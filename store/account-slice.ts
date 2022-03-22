import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  id: string;
  role: string;
}

const accountSlice = createSlice({
  name: "Account",
  initialState: { id: "", role: "" },
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
