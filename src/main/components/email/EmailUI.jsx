/*eslint-disable */

import React, { Component } from "react";
import { fetchGoogleApi } from "../../../utils/googleApiUtils";

export default class EmailUI extends Component {

  state = {
    retry: false
  };
  componentDidMount() {
    this.fetchLabels();
    this.fetchMessages();
  }

  fetchLabels = () => {
    fetchGoogleApi("/labels")
      .then(this.handleLabels)
      .catch(this.handleLabelsError);
  };

  handleLabels = response => {
    const data = response.data;

    console.log("Data: ", data);
  };

  handleLabelsError = error => {
    console.log("Errors: ", error.data || "Error fetching lables");
  };

  fetchMessages = () => {
    fetchGoogleApi("/messages")
      .then(this.handleMessages)
      .catch(this.handleMessagesError);
  };

  handleMessages = (response) => {
    const data = response.data;
    console.log("Data: ", data);
  }

  handleMessagesError = (error) => {
    console.log("Errors: ", error.data || "Error fetching lables");
  }


  render() {
    // JSX
    return (
      <div>
        <h2>I am the Email Component</h2>
        <button onClick={this.fetchLabels}>Fetch Labels</button>
        <button onClick={this.fetchMessages}>Fetch Messages</button>
      </div>
    );
  }
}
