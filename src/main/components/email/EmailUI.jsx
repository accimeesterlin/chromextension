/*eslint-disable */

import React, { Component } from "react";
import { fetchGoogleApi, sendEmailToGoogle } from "../../../utils/googleApiUtils";
import { generateEmailPayload } from "../../../utils/emailPayload";

export default class EmailUI extends Component {

  state = {
    retry: false
  };
  componentDidMount() {
    this.fetchLabels();
    this.fetchMessages();
  }

  fetchLabels = () => {
    fetchGoogleApi("/labels", (response, error) => {
      if (error) {
        return this.handleLabelsError(error);
      }

      this.handleLabels(response);
    })
  };

  handleLabels = response => {
    const data = response.data;

    console.log("Label Data: ", data);
  };

  handleLabelsError = error => {
    console.log("Errors: ", error.response.status || "Error fetching lables");
  };

  fetchMessages = () => {
    fetchGoogleApi("/messages", (response, error) => {
      if (error) {
        return this.handleMessagesError(error);
      }

      this.handleMessages(response);
    })
  };

  handleMessages = (response) => {
    const data = response.data;
    console.log("Messages Data: ", data);
  }

  handleMessagesError = (error) => {
    console.log("Errors: ", error.response.status || "Error fetching messages");
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }


  sendEmail = (event) => {
    event.preventDefault();
    const payload = generateEmailPayload(this.state);
    sendEmailToGoogle(payload)
      .then((response) => {
        console.log('Response: ', response.data);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  render() {
    // JSX
    return (
      <div>
        <h2>I am the Email Component</h2>
        <button onClick={this.fetchLabels}>Fetch Labels</button>
        <button onClick={this.fetchMessages}>Fetch Messages</button>

        <form onSubmit={this.sendEmail}>
          <input type="text" placeholder="sender" name="sender" onChange={this.handleChange}/> <br/>
          <input type="text" placeholder="subject" name="subject" onChange={this.handleChange}/> <br/>
          <input type="text" placeholder="receiver" name="receiver" onChange={this.handleChange}/> <br/>
          <input type="text" placeholder="message" name="message" onChange={this.handleChange}/> <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
