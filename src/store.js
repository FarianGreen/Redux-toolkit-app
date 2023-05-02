import { configureStore } from "@reduxjs/toolkit";
import { sliceHaveData } from "./sliceRedux/sliceHaveData";
import { sliceEpisode } from "./sliceRedux/sliceEpisodeList";

const store = configureStore({
  reducer: {
    characters: sliceHaveData.reducer,
    episodes:sliceEpisode.reducer
  },
  devTools: true,
});
export default store;
