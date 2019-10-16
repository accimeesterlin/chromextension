/*eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@material-ui/core";
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
      sender: props.tutorEmail || 'esterlinaccime@gmail.com', // TODO for development
      emailTemplate: "none",
      pending: false,
      variant: "success",
      snackBarMessage: "",
      query: null,
      messages: props.messages || [],
      enableEmailMessages: false // feature flag (hardcoded)
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

  sendEmail = (subject, receiver) => {
    const { currentTemplate } = this.props;
    console.log('Current Template: ', currentTemplate);
    console.log('Subject: ', subject);
    console.log('Receiver: ', receiver);
    // const payload = createEmailPayload({
    //   subject,
    //   message: msg,
    //   sender,
    //   receiver
    // });
  };

  openSnackBar = (message, status = "success") => {
    this.setState({
      open: true,
      isModalOpen: false,
      variant: status,
      snackBarMessage: message
    });
  };

  fetchMoreData = () => {
    const { token, nextPageToken, loadMessages } = this.props;
    const { gmailLabel, query } = this.state;

    if (gmailLabel !== "center_support") {
      const label = "IMPORTANT";
      loadMessages(token, nextPageToken, label, query);
    }
  };

  enableEmailMessages = () => {
    const { labels, messages, loadMessages, resultSizeEstimate } = this.props;
    const hasMore = messages.length < resultSizeEstimate;

    if (!this.state.enableEmailMessages) {
      return null
    }

    return (
      <div>
        <EmailLabels loadMessages={loadMessages} labels={labels} />
        <InfiniteScroll
          dataLength={messages.length}
          next={this.fetchMoreData}
          className="email-messages"
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <EmailMessages
            messages={messages}
          />
        </InfiniteScroll>
      </div>
    );
    
  };

  render() {
    const {
      templates,
      token,
      updateTemplate,
      currentTemplate,
      updateReceiverDetails,
      updateReceiverMsg,
      receiverSubject,
      receiverEmail,
      receiverMsg
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
       
        <EmailFormModal
          sendEmail={this.sendEmail}
          templates={templates}
          updateTemplate={updateTemplate}
          currentTemplate={currentTemplate}
          updateReceiverDetails={updateReceiverDetails}
          updateReceiverMsg={updateReceiverMsg}
          subject={receiverSubject}
          receiver={receiverEmail}
        >
          <Button variant="outlined" color="primary">
            New Email
          </Button>
        </EmailFormModal>

        {this.enableEmailMessages()}
        
      </Content>
    );
  }
}

EmailUI.propTypes = {
  // Token
  token: PropTypes.string.isRequired,
  nextPageToken: PropTypes.string.isRequired,
  
  // Emails
  tutorEmail: PropTypes.string.isRequired,
  receiverSubject: PropTypes.string.isRequired,
  receiverEmail: PropTypes.string.isRequired,
  receiverMsg: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  resultSizeEstimate: PropTypes.number,
  labels: PropTypes.array.isRequired,
  updateReceiverDetails: PropTypes.func.isRequired,
  updateReceiverMsg: PropTypes.func.isRequired,

  // templates
  updateTemplate: PropTypes.func.isRequired,
  currentTemplate: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  templateSubject: PropTypes.string
};
