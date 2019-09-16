/*eslint-disable */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button, CircularProgress } from "@material-ui/core";
import SnackBarContent from "../common/SnackBar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import IntegationComponents from "./Integrations";
import EmailFormModal from "./EmailFormModal";
import { sendEmailToGoogle } from "../../../utils/googleApiUtils";
import { createEmailPayload } from "../../../utils/emailPayload";
import Content from "../common/content/Content";
import EmailLabels from "./EmailLabels";
import EmailMessages from "./EmailMessages";

import "./email.scss";

const log = console.log;

export default class EmailUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: "esterlinaccime@gmail.com", // TODO: temporary
      emailTemplate: "none",
      pending: false,
      variant: "success",
      snackBarMessage: "",
      query: null,
      messages: props.messages || []
    };
  }

  // Initialize data
  componentDidMount() {
    if (chrome && chrome.identity) {
      const {
        token,
        loadMessages,
        loadLabels,
        messages,
        getTutorGmailProfile
      } = this.props;
      log("Message on LOAD: ", messages);
      getTutorGmailProfile(token);
      loadMessages(token);
      loadLabels(token);
      this.setState({ pageLoaded: true });
    }
  }

  sendEmail = (subject, receiver, msg) => {
    const { sender } = this.state;
    const payload = createEmailPayload({
      subject,
      message: msg,
      sender,
      receiver
    });

    this.setState({ pending: true });
    sendEmailToGoogle(payload, (response, error) => {
      if (error) {
        log(JSON.stringify(error.response));
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error.message) ||
          "Failed sending email!!";
        this.openSnackBar(errorMessage, "error");
        return;
      }
      log("Response: ", response.data);
      this.openSnackBar("Email sent!!!");
    });
  };

  openSnackBar = (message, status = "success") => {
    this.setState({
      open: true,
      isModalOpen: false,
      variant: status,
      snackBarMessage: message
    });
  };

  renderSubmitButton = () => {
    const { pending } = this.state;

    if (pending) {
      return <CircularProgress />;
    }

    return (
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    );
  };

  fetchMoreData = () => {
    const { token, nextPageToken, loadMessages } = this.props;
    const { gmailLabel, query } = this.state;

    if (gmailLabel !== "center_support") {
      const label = "IMPORTANT";
      loadMessages(token, nextPageToken, label, query);
    }
  };
  

  render() {
    const {
      labels,
      resultSizeEstimate,
      messages,
      templates,
      token,
      loadMessages
    } = this.props;
    
    if (!token) return <IntegationComponents {...this.props} />;

    // JSX
    return (
      <Content className="email" {...this.props}>
        <SnackBarContent
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          variant={this.state.variant}
          message={this.state.snackBarMessage}
        />

        <EmailFormModal sendEmail={this.sendEmail} templates={templates}>
          <Button
            variant="outlined"
            color="primary"
          >
            New Email
          </Button>
        </EmailFormModal>
        <EmailLabels loadMessages={loadMessages} labels={labels} />
        <EmailMessages messages={messages} fetchMoreData={this.fetchMoreData} />
      </Content>
    );
  }
}

EmailUI.propTypes = {
  messages: PropTypes.array.isRequired,
  templates: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  nextPageToken: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  tutorEmail: PropTypes.string.isRequired,
  resultSizeEstimate: PropTypes.number
};
