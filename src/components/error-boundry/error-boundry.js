import React from "react";
import { Alert } from "antd";

class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert
          message="Error"
          description="Sorry, but we have some problem with app."
          type="error"
          showIcon
        />
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundry;
