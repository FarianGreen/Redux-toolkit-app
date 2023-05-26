import React from "react";
import { Table, Tag } from "antd";
import "./character-list.css";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import { takePage } from "../../sliceRedux/sliceHaveData";
import { takeCharId } from "../../sliceRedux/sliceEpisodeList";
import { useDispatch, useSelector } from "react-redux";
import { useCharactersListData } from "../hooks/useCharacterListData";

const CharacterList = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

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
            onClick={() => dispatch(takeCharId(record.id))}
          >
            <span className="material-symbols-outlined my-menu">menu_open</span>
          </Link>
        );
      },
    },
  ];

  const page = useSelector((state) => state.characters.page);

  const { listCharacters, totalPages } = useCharactersListData(page, id);

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
export default CharacterList;
