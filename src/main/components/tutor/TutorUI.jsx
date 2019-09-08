import React, { Component } from "react";
import Content from "../common/content/Content";

export default class TutorUI extends Component {
  render() {
    // JSX
    return (
      <Content {...this.props}>
        <div>
          <h2>I am the Tutor Component</h2>
        </div>
      </Content>
    );
  }
}
