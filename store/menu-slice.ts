import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "Menu visibility",
  initialState: false,
  reducers: {
    toggleMenuVisibility: state => {
      state = !state;
    },
  },
});

export const { toggleMenuVisibility } = menuSlice.actions;

export default menuSlice.reducer;
