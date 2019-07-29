/*eslint-disable */

import React, { Component } from "react";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchBox from "../common/searchBox/SearchBoxUI";

import {
  Container,
  MenuItem,
  Grid,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import SnackBarContent from "../common/SnackBar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import EmailFormUI from "./EmailFormUI";
import { sendEmailToGoogle } from "../../../utils/googleApiUtils";
import { generateEmailPayload } from "../../../utils/emailPayload";

import "./email.scss";

export default class EmailUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty() || {},
      subject: "",
      emailMessage: "",
      sender: "esterlinaccime@gmail.com", // TODO: temporary
      receiver: "",
      emailTemplate: "none",
      pending: false,
      variant: "success",
      snackBarMessage: "",
      isModalOpen: false,
      gmailLabel: "central_support",
      hasMore: true,
      query: null,
      messages: props.messages || []
    };
  }

  componentDidMount() {
    if (chrome && chrome.identity) {
      const { token, loadMessages, loadLabels, messages } = this.props;
      log("Message on LOAD: ", messages);
      loadMessages(token);
      loadLabels(token);
      this.setState({ pageLoaded: true });
    }
  }

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
        if (element.name.toLowerCase() === "subject") {
          subject = element.value;
        }
      });
    }

    return subject;
  };

  fetchMoreData = () => {
    const { token, nextPageToken, loadMessages } = this.props;
    const { gmailLabel, query } = this.state;

    if (gmailLabel !== "center_support") {
      const label = "IMPORTANT";
      loadMessages(token, nextPageToken, label, query);
    }
  };

  selectGmailLabel = event => {
    const { value, name } = event.target;
    const { token, loadMessages } = this.props;

    this.setState({
      [name]: value
    });
    const shouldEmptyMessages = true;
    const nextPageToken = null;
    const query = null;
    loadMessages(token, nextPageToken, value, query, shouldEmptyMessages);
  };

  render() {
    const {
      editorState,
      emailTemplate,
      isModalOpen,
      receiver,
      subject,
      gmailLabel
    } = this.state;

    const { labels, resultSizeEstimate, messages } = this.props;
    const hasMore = messages.length < resultSizeEstimate;
    log("State: ", this.state);
    log("Props: ", this.props);
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

        <Select
          value={gmailLabel}
          // autoWidth={true}
          onChange={this.selectGmailLabel}
          name="gmailLabel"
          className="email-gmail__label"
        >
          <MenuItem value="central_support">Central Support</MenuItem>
          {labels.length > 0
            ? labels.map(({ id, name }) => (
                <MenuItem value={id} key={id}>
                  {name}
                </MenuItem>
              ))
            : null}
        </Select>

        <InfiniteScroll
          dataLength={this.props.messages.length}
          next={this.fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {messages.length > 0
            ? messages.map(({ payload }, index) => (
                <Card className="template-card">
                  <CardContent id="template-card__content">
                    <Grid container justify="space-between" alignItems="center">
                      <Grid>
                        <p>
                          <b>{index + 1}</b> -
                          {this.displayGmailSubject(payload)}
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
        </InfiniteScroll>
      </Container>
    );
  }
}

function DisplayEmail(props) {
  log("Display Email: ", props);
  return (
    <Card className="template-card">
      <CardContent id="template-card__content">
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            <p>
              <b>{props.num}</b> - {props.displayGmailSubject(payload)}
            </p>
          </Grid>
          <Grid className="template-card__buttons">
            <Button onClick={props.handleClose} color="primary">
              Copy
            </Button>
            <Button onClick={props.addTemplate} color="primary">
              Edit
            </Button>

            <Button onClick={props.addTemplate} color="primary">
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
