import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
      color: "rgb(167, 149, 29)",
    }}
    spin
  />
);
const Spinner = () => {
  return <Spin indicator={antIcon} />;
};
export default Spinner;
