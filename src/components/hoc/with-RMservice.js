import React from "react";
import { RMserviceConsumer } from "../Rm-service-context/rm-service-context";

const withRMservice = () => (Wrapped) => {
  return (props) => {
    return (
      <RMserviceConsumer>
        {(RMservice) => {
          return <Wrapped {...props} RMservice={RMservice} />;
        }}
      </RMserviceConsumer>
    );
  };
};
export default withRMservice;
