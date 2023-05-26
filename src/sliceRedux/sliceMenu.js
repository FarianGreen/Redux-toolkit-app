import { createSlice } from "@reduxjs/toolkit";

export const sliceMenu = createSlice({
  name: "menuSlice",
  initialState: {
    menuActive: true,
  },
  reducers: {
    isMenuActive: (state, action) => {
      state.menuActive = action.payload;
    },
  },
});

export const { isMenuActive } = sliceMenu.actions;
