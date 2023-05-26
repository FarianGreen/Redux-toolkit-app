import {
  takeCharactersExistPage,
  takeCharactersExistId,
  takeTotalCountPages,
} from "../../sliceRedux/sliceHaveData";
import { useDispatch, useSelector } from "react-redux";
import RMapiService from "../../service/rmapi-service";
import { useEffect } from "react";

export function useCharactersListData(page, id) {
  const RMservice = new RMapiService();
  const dispatch = useDispatch();

  const listCharacters = useSelector(
    (state) => state.characters.charactersList
  );
  const totalPages = useSelector(
    (state) => state.characters.countCharactersInPage
  );

  useEffect(() => {
    haveData();
  }, [page, id]);

  async function dataExistIds() {
    const response = await RMservice.getSingleEpisode(id).then((results) => {
      dispatch(takeTotalCountPages(results.characters));
      return results.characters;
    });

    const dataCharactersInEpisod = await RMservice.getCharacter(response).then(
      (results) => {
        if (results.length > 1) {
          return results.map((item) => ({ ...item, key: item.id }));
        } else return [results];
      }
    );
    return dispatch(takeCharactersExistId(dataCharactersInEpisod));
  }

  async function dataExistPage() {
    const charactersList = await RMservice.getAllCharacters(page).then(
      (response) => {
        return response.results.map((item) => ({ ...item, key: item.id }));
      }
    );
    const infoCharacters = await RMservice.getAllCharacters(page).then(
      (response) => {
        return response.info.count;
      }
    );
    dispatch(takeTotalCountPages(infoCharacters));
    return dispatch(takeCharactersExistPage(charactersList));
  }

  async function haveData() {
    const isExistId = Boolean(id);
    const isExistPage = Boolean(page);

    switch (true) {
      case isExistId:
        return dataExistIds();
      case isExistPage:
        return dataExistPage();
    }
  }
  return { listCharacters, totalPages };
}
