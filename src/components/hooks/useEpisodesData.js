import { useDispatch, useSelector } from "react-redux";
import {
  takeEpisodesExistId,
  takeEpisodesExistPage,
  takeTotalCountPages,
} from "../../sliceRedux/sliceEpisodeList";
import { useEffect } from "react";
import RMapiService from "../../service/rmapi-service";

export function useEpisodesData(page, id) {
  const RMservice = new RMapiService();
  const dispatch = useDispatch();

  const episodeList = useSelector((state) => state.episodes.episodeList);
  const totalPages = useSelector((state) => state.episodes.countEpisodesInPage);
  const charId = useSelector((state) => state.episodes.charId);

  useEffect(() => {
    haveEpisodeData();
  }, [page, id, charId]);

  async function dataExistIds() {
    const response = await RMservice.getCharacter(charId || id).then(
      (results) => {
        dispatch(takeTotalCountPages(results.episode));
        return results.episode;
      }
    );

    const dataEpisods = await RMservice.getCharacterEpisode(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return dispatch(takeEpisodesExistId(dataEpisods));
  }

  async function dataExistPage() {
    const episodes = await RMservice.getAllEpisodes(page).then((response) => {
      return response.results.map((item) => ({ ...item, key: item.id }));
    });
    const infoEpisodes = await RMservice.getAllEpisodes(page).then(
      (response) => {
        return response.info.count;
      }
    );
    return (
      dispatch(takeEpisodesExistPage(episodes)),
      dispatch(takeTotalCountPages(infoEpisodes))
    );
  }

  async function haveEpisodeData() {
    const isExistIds = Boolean(id) || Boolean(charId);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistIds:
        return dataExistIds();
      case isExistPage:
        return dataExistPage();
    }
  }

  return { episodeList, totalPages };
}
