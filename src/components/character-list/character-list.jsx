import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import "./character-list.css";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import withRMservice from "../hoc/with-RMservice";
import {
  takePage,
  takeCharactersExistPage,
  takeCharactersExistId,
  takeTotalCountPages,
} from "../../sliceRedux/sliceHaveData";
import { useDispatch, useSelector } from "react-redux";

const CharacterList = ({ RMservice, onCharacterSelected }) => {
  const { id } = useParams();

  const columns = [
    { key: "0", title: "ID", dataIndex: "id" },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      key: "1",
      width: "15%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
        {
          text: "Alien",
          value: "Alien",
        },
        {
          text: "Unknown",
          value: "unknown",
        },
        ,
        {
          text: "Genderless",
          value: "Genderless",
        },
      ],
      onFilter: (value, item) => item.gender.includes(value),

      render: (tag) => {
        const color = tag.includes("Male")
          ? "blue"
          : tag.includes("Female")
          ? "pink"
          : "rgb(171, 166, 166)";
        return (
          <Tag className="tag" color={color}>
            {tag}
          </Tag>
        );
      },

      width: "15%",
      key: "2",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Alive",
          value: "Alive",
        },
        {
          text: "Dead",
          value: "Dead",
        },
        {
          text: "Unknown",
          value: "unknown",
        },
      ],
      onFilter: (value, item) => item.status.includes(value),
      render: (tag) => {
        const color = tag.includes("Alive")
          ? "green"
          : tag.includes("Dead")
          ? "red"
          : "rgb(171, 166, 166)";
        return (
          <Tag className="tag" color={color}>
            {tag}
          </Tag>
        );
      },
      width: "15%",
      key: "3",
    },
    {
      title: "Species",
      dataIndex: "species",
      width: "15%",
      key: "4",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      width: "20%",
      key: "5",
    },
    {
      title: "Details",
      dataIndex: "details",
      width: "20%",
      key: "6",
      render: (_, record) => {
        return (
          <Link
            to={`/character/${record.id}`}
            onClick={() => onCharacterSelected(record.id)}
          >
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </Link>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const listCharacters = useSelector(
    (state) => state.characters.charactersList
  );
  const totalPages = useSelector((state) => state.characters.countCharactersInPage);

  const page = useSelector((state) => state.characters.page);

  useEffect(() => {
    haveData();
  }, [page,id]);

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
        return response.info.count
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

  if (!listCharacters) {
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
        dataSource={listCharacters}
        pagination={{
          showSizeChanger: false,
          current: page,
          pageSize: 20,
          onChange: (page) => {
            dispatch(takePage(page));
          },
          total: totalPages,
        }}
      />
    </div>
  );
};
export default withRMservice()(CharacterList);
