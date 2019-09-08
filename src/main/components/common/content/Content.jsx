/*eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";

import Sidebar from "../sidebar/Sidebar";

export default class ContentComponent extends Component {
  render() {
    // JSX

    return (
      <div className="content">
        <Sidebar {...this.props} />
        <div className={this.props.className}>
            {this.props.children}
        </div>
      </div>
    );
  }
}

ContentComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
