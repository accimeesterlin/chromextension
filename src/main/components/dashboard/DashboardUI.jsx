import React, { Component } from "react";

import Content from "../common/content/Content";

export default class Dashboard extends Component {
  render() {
    // JSX
    return (
      <Content className="dashboard"  {...this.props}>
        <h2>I am the Dashboard Component</h2>
      </Content>
    );
  }
}
