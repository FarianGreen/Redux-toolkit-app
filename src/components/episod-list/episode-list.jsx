import "./episod-list.css";
import { Table, Tag } from "antd";
import { Link, useParams } from "react-router-dom";
import Spinner from "../spinner";
import { useDispatch, useSelector } from "react-redux";
import { takePage } from "../../sliceRedux/sliceEpisodeList";
import { useEpisodesData } from "../hooks/useEpisodesData";

const EpisodeList = () => {
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

  const page = useSelector((state) => state.episodes.page);

  const { episodeList, totalPages } = useEpisodesData(page, id);

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
            dispatch(takePage(page));
          },
          total: totalPages,
        }}
      />
    </div>
  );
};

export default EpisodeList;
