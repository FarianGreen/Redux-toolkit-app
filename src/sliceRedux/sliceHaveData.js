import { createSlice } from "@reduxjs/toolkit";

export const sliceHaveData = createSlice({
  name: "haveData",
  initialState: {
    countCharactersInPage: 0,
    page: [1],
    charactersList: [],
    character: [],
  },
  reducers: {
    takeCharactersExistPage: (state, action) => {
      state.charactersList = action.payload;
    },
    takeCharactersExistId: (state, action) => {
      state.charactersList = action.payload;
    },
    takeTotalCountPages: (state, action) => {
      state.countCharactersInPage = action.payload;
    },
    takeCharacter: (state, action) => {
      state.character = action.payload;
    },
    takePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  takeCharactersExistPage,
  takePage,
  takeCharactersExistId,
  takeTotalCountPages,
  takeCharacter
} = sliceHaveData.actions;
