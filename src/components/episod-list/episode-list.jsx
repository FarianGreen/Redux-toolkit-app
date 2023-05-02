import "./episod-list.css";
import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import withRMservice from "../hoc/with-RMservice";
import { useDispatch, useSelector } from "react-redux";
import { takeEpisodesExistId, takeEpisodesExistPage, takePage, takeTotalCountPages } from "../../sliceRedux/sliceEpisodeList";

const EpisodeList = ({ charId, RMservice }) => {
  const { id } = useParams();

  const columns = [
    {
      key: "0",
      title: "Name",
      dataIndex: "name",
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(95, 158, 51)"}>{tag}</Tag>;
      },
    },
    {
      key: "1",
      title: "Date",
      dataIndex: "airdate",
      sorter: (record1, record2) => {
        return record1.airdate > record2.airdate;
      },
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(53, 168, 168)"}>{tag}</Tag>;
      },
    },
    {
      key: "2",
      title: "Episode",
      dataIndex: "episode",
      sorter: (record1, record2) => {
        return record1.airdate > record2.airdate;
      },
      width: "20%",
      render: (tag) => {
        return <Tag color={"rgb(159, 255, 16)"}>{tag}</Tag>;
      },
    },
    {
      key: "3",
      title: "Action",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <Link to={`/characters_in_episode/${record.id}`}>
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </Link>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const episodeList = useSelector((state) => state.episodes.episodeList);
  const totalPages = useSelector((state) => state.episodes.countEpisodesInPage);
  const page = useSelector((state) => state.episodes.page)

  useEffect(() => {
    haveEpisodeData();
  }, [page, id, charId]);

  async function dataExistIds() {
    const response = await RMservice.getCharacter(charId || id).then(
      (results) => {
        dispatch(takeTotalCountPages(results.episode))
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
    return dispatch(takeEpisodesExistPage(episodes)), dispatch(takeTotalCountPages(infoEpisodes));
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

  if (!episodeList) {
    return (
      <div className="spin">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="wrapper__table">
      <Table
        className="table"
        columns={columns}
        dataSource={episodeList}
        pagination={{
          showSizeChanger: false,
          pageSize: 20,
          onChange: (page) => {
            dispatch(takePage(page))
          },
          total: totalPages,
        }}
      />
    </div>
  );
};

export default withRMservice()(EpisodeList);
