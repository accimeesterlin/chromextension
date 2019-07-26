/*eslint-disable */

import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  Container,
  TextField,
  Select,
  MenuItem,
  Grid,
  Button,
  CircularProgress
} from "@material-ui/core";
import SnackBarContent from "../common/SnackBar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
    snackBarMessage: ""
  };
  state = this.initialState;

  componentDidMount() {
    if (chrome && chrome.identity) {
      this.fetchLabels();
      this.fetchMessages();
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
    fetchGoogleApi("/messages", (response, error) => {
      if (error) {
        return this.handleMessagesError(error);
      }

      this.handleMessages(response);
    });
  };

  handleMessages = response => {
    const data = response.data;
    console.log("Messages Data: ", data);
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

  selectTemplate = (event) => {
    const templates = this.props.templates;
    const { value: index, name } = event.target;

    const { templateContent, templateSubject, templateEditor } = templates[index];

    this.setState({
      [name]: index,
      editorState: templateEditor,
      subject: templateSubject,
      emailMessage: templateContent,
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
  render() {
    const { editorState } = this.state;

    console.log("State: ", this.state);
    // JSX
    return (
      <Container className="email">
        <Grid container space={4}>
          <Grid item xs={6}>
            <h2>New Message</h2>
            <form onSubmit={this.sendEmail}>
              <TextField
                value={this.state.receiver}
                label="To:"
                fullWidth={true}
                name="receiver"
                onChange={this.handleChange}
              />
              <TextField
                value={this.state.subject}
                label="Subject:"
                fullWidth={true}
                name="subject"
                onChange={this.handleChange}
              />

              {this.props.templates.length > 0 ? (
                <Select
                  value={this.state.emailTemplate}
                  autoWidth={true}
                  onChange={this.selectTemplate}
                  name="emailTemplate"
                  className="email-emailTemplate"
                  inputProps={{
                    name: "emailTemplate",
                    id: "emailTemplate"
                  }}
                >
                  <MenuItem value="none">None</MenuItem>
                  {this.renderTemplateSelection()}
                </Select>
              ) : null}

              <Editor
                initialEditorState={editorState}
                toolbarClassName="email-toolbarClassName"
                wrapperClassName="email-wrapperClassName"
                editorClassName="email-editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
              {this.renderSubmitButton()}
            </form>
          </Grid>
        </Grid>
        <SnackBarContent
          onClose={this.handleClose}
          open={this.state.open}
          variant={this.state.variant}
          message={this.state.snackBarMessage}
        />
      </Container>
    );
  }
}
