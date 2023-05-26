import { configureStore } from "@reduxjs/toolkit";
import { sliceHaveData } from "./sliceRedux/sliceHaveData";
import { sliceEpisode } from "./sliceRedux/sliceEpisodeList";
import { sliceMenu } from "./sliceRedux/sliceMenu";

const store = configureStore({
  reducer: {
    characters: sliceHaveData.reducer,
    episodes: sliceEpisode.reducer,
    menu: sliceMenu.reducer,
  },
  devTools: true,
});
export default store;
