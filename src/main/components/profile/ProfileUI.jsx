import React, { Component } from "react";
import Content from "../common/content/Content";

export default class ProfileUI extends Component {
  render() {
    // JSX
    return (
      <Content {...this.props}>
        {/* <div className="home-content_main">{this.loadMainContent()}</div> */}
        <h2>I am the Profile Component</h2>
      </Content>
    );
  }
}
