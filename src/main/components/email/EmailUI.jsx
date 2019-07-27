/*eslint-disable */

import React, { Component } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  Container,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Card,
  CardContent
} from "@material-ui/core";
import SnackBarContent from "../common/SnackBar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import EmailFormUI from "./EmailFormUI";
import {
  fetchGoogleApi,
  sendEmailToGoogle
} from "../../../utils/googleApiUtils";
import { generateEmailPayload } from "../../../utils/emailPayload";

import "./email.scss";

export default class EmailUI extends Component {
  initialState = {
    editorState: EditorState.createEmpty() || {},
    subject: "",
    emailMessage: "",
    sender: "esterlinaccime@gmail.com", // TODO: temporary
    receiver: "",
    emailTemplate: "none",
    pending: false,
    variant: "success",
    snackBarMessage: "",
    isModalOpen: false
  };
  state = this.initialState;

  componentDidMount() {
    if (chrome && chrome.identity) {
      const { token, loadMessages } = this.props;
      loadMessages(10, token);
      this.fetchLabels();
    }
  }

  fetchLabels = () => {
    fetchGoogleApi("/labels", (response, error) => {
      if (error) {
        return this.handleLabelsError(error);
      }

      this.handleLabels(response);
    });
  };

  handleLabels = response => {
    const data = response.data;

    console.log("Label Data: ", data);
  };

  handleLabelsError = error => {
    console.log(JSON.stringify(error.response));
  };

  fetchMessages = () => {
    fetchGoogleApi("/messages?maxResults=10", (response, error) => {
      if (error) {
        return this.handleMessagesError(error);
      }

      this.handleMessages(response);
    });
  };

  handleMessages = response => {
    const data = response.data;

    if (data.messages) {
      this.props.loadMessages(data.messages);
      console.log("Messages loaded!!!", data.messages);
    }
  };

  handleMessagesError = error => {
    console.log(JSON.stringify(error.response));
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  selectTemplate = event => {
    const templates = this.props.templates;
    const { value: index, name } = event.target;

    const { templateContent, templateSubject, templateEditor } = templates[
      index
    ];

    this.setState({
      [name]: index,
      editorState: templateEditor,
      subject: templateSubject,
      emailMessage: templateContent
    });
  };

  sendEmail = event => {
    event.preventDefault();
    const { subject, emailMessage, sender, receiver } = this.state;
    const payload = generateEmailPayload({
      subject,
      message: emailMessage,
      sender,
      receiver
    });

    this.setState({ pending: true });
    sendEmailToGoogle(payload, (response, error) => {
      if (error) {
        console.log(JSON.stringify(error.response));
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.error.message) ||
          "Failed sending email!!";
        this.openSnackBar(errorMessage, "error");
        return;
      }
      console.log("Response: ", response.data);
      this.openSnackBar("Email sent!!!");
    });
  };

  openSnackBar = (message, status = "success") => {
    this.setState({
      ...this.initialState,
      open: true,
      isModalOpen: false,
      variant: status,
      snackBarMessage: message
    });
  };

  onEditorStateChange = editorState => {
    const editorSourceHTML = stateToHTML(editorState.getCurrentContent());
    this.setState({
      emailMessage: editorSourceHTML,
      editorState
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

  handleClose = () => {
    this.setState({ open: false });
  };

  renderTemplateSelection = () => {
    const templates = this.props.templates;

    return templates.map(({ templateName }, key) => (
      <MenuItem key={key} value={key}>
        {templateName}
      </MenuItem>
    ));
  };

  displayGmailSubject = payload => {
    let subject = "No Subject found!!!";

    if (payload && payload.headers) {
      payload.headers.map(element => {
        if (element.name === "Subject") {
          subject = element.value;
        }
      });
    }

    return subject;
  };
  render() {
    const {
      editorState,
      emailTemplate,
      isModalOpen,
      receiver,
      subject
    } = this.state;

    // JSX
    return (
      <Container className="email">
        <SnackBarContent
          onClose={() => this.setState({ open: false })}
          open={this.state.open}
          variant={this.state.variant}
          message={this.state.snackBarMessage}
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={() => this.setState({ isModalOpen: true })}
        >
          New Email
        </Button>

        <Dialog
          open={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Message</DialogTitle>
          <DialogContent>
            <EmailFormUI
              // Simple values
              sendEmail={this.sendEmail}
              receiver={receiver}
              subject={subject}
              emailTemplate={emailTemplate}
              editorState={editorState}
              templates={this.props.templates}
              // List of functions
              handleChange={this.handleChange}
              selectTemplate={this.selectTemplate}
              renderTemplateSelection={this.renderTemplateSelection}
              onEditorStateChange={this.onEditorStateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ isModalOpen: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={this.sendEmail} type="submit" color="primary">
              Send Email
            </Button>
          </DialogActions>
        </Dialog>

        {this.props.templates.length > 0
          ? this.props.messages.map(({ snippet, payload }, key) => (
              <Card className="template-card" key={key}>
                <CardContent id="template-card__content">
                  <Grid container justify="space-between" alignItems="center">
                    <Grid>
                      <p>
                        {" "}
                        <b>{key + 1}</b> - {this.displayGmailSubject(payload)}
                      </p>
                    </Grid>
                    <Grid className="template-card__buttons">
                      <Button onClick={this.handleClose} color="primary">
                        Copy
                      </Button>
                      <Button onClick={this.addTemplate} color="primary">
                        Edit
                      </Button>

                      <Button onClick={this.addTemplate} color="primary">
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))
          : null}
      </Container>
    );
  }
}
