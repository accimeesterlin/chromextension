/*eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import SnackBarContent from "../common/SnackBar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import IntegationComponents from "./Integrations";
import EmailFormModal from "./EmailFormModal";
import Content from "../common/content/Content";

import "./email.scss";

const log = console.log;

export default class EmailUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: props.tutorEmail,
      emailTemplate: "none",
      pending: false,
      variant: "success",
      snackBarMessage: "",
      query: null
    };
  }

  sendEmailToGmail = (event) => {
    const { requestToSendEmail } = this.props;
    event.preventDefault();
    requestToSendEmail();
  };

  openSnackBar = (message, status = "success") => {
    this.setState({
      open: true,
      isModalOpen: false,
      variant: status,
      snackBarMessage: message
    });
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
          sendEmail={this.sendEmailToGmail}
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

      </Content>
    );
  }
}

EmailUI.propTypes = {
  // token
  token:  PropTypes.string.isRequired,

  // Emails
  tutorEmail: PropTypes.string.isRequired,
  receiverSubject: PropTypes.string.isRequired,
  receiverEmail: PropTypes.string.isRequired,
  receiverMsg: PropTypes.string.isRequired,
  resultSizeEstimate: PropTypes.number,
  updateReceiverDetails: PropTypes.func.isRequired,
  updateReceiverMsg: PropTypes.func.isRequired,
  requestToSendEmail: PropTypes.func.isRequired,

  // templates
  updateTemplate: PropTypes.func.isRequired,
  currentTemplate: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired,
  templateSubject: PropTypes.string
};
