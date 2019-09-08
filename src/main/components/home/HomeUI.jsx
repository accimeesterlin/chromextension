/*eslint-disable */
import React, { Component } from "react";

import { loadToken } from "../../../utils/authUtils";
import "./home.scss";

import Content from "../common/content/Content";

export default class HomeUI extends Component {
  componentDidMount() {
    if (chrome) {
      loadToken();
    }
  }

  render() {
    // JSX
    return (
      <Content {...this.props}>
        <div className="home">
          <h1>I am the Home Component</h1>
        </div>
      </Content>
    );
  }
}
