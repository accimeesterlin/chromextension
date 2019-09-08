import React, { Component } from "react";

import Content from "../common/content/Content";

export default class Calendar extends Component {
  render() {
    // JSX
    return (
      <Content className="calendar"  {...this.props}>
        <h2>I am the Calendar Component</h2>
      </Content>
    );
  }
}
