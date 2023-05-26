import { createSlice } from "@reduxjs/toolkit";

export const sliceEpisode = createSlice({
  name: "EpisodeList",
  initialState: {
    episodeList: [],
    page: [1],
    countEpisodesInPage: 0,
    charId: 0,
  },
  reducers: {
    takeEpisodesExistPage: (state, action) => {
      state.episodeList = action.payload;
    },
    takeEpisodesExistId: (state, action) => {
      state.episodeList = action.payload;
    },
    takeTotalCountPages: (state, action) => {
      state.countEpisodesInPage = action.payload;
    },
    takeCharId: (state, action) => {
      state.charId = action.payload;
    },
    takePage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  takeEpisodesExistId,
  takeEpisodesExistPage,
  takeTotalCountPages,
  takePage,
  takeCharId,
} = sliceEpisode.actions;
