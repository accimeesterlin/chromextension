/*eslint-disable */
import React, { Component } from "react";
import { Button } from "@material-ui/core";

import { loadToken } from '../../../utils/authUtils';
import Content from "../common/content/Content";

export default class ProfileUI extends Component {

  logout = () => {
    const isTokenAuthorized = true;
    const token = loadToken(isTokenAuthorized);
    const options = {
      token
    };
    if (chrome && chrome.identity) {
      chrome.identity.removeCachedAuthToken(options, (token) => {
        console.log('Token has been cleared!!!!');
        localStorage.removeItem('token');
        console.log('Token: ', token);
      });
    }
  };

  render() {
    // JSX
    return (
      <Content {...this.props}>
        <h2>I am the Profile Component</h2>

        <Button onClick={this.logout} variant="outlined" color="primary">
            Log out
          </Button>
      </Content>
    );
  }
}
