import React, { Component } from "react";

import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import TemplateFormUI from "./TemplateFormUI";

import "./template.scss";

export default class TemplateUI extends Component {
  initialState = {
    templateEditor: EditorState.createEmpty() || {},
    templateContent: "",
    isOpen: false,
    includeSubject: false,
    templateName: "",
    templateSubject: ""
  };
  state = this.initialState;

  onEditorStateChange = templateEditor => {
    const editorSourceHTML = stateToHTML(templateEditor.getCurrentContent());
    this.setState({
      templateContent: editorSourceHTML,
      templateEditor
    });
  };

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChecked = name => event => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  addTemplate = event => {
    event.preventDefault();

    const {
      templateContent,
      templateName,
      templateSubject,
      templateEditor
    } = this.state;

    this.props.addTemplate({
      templateContent,
      templateSubject,
      templateName,
      templateEditor
    });

    this.setState({ isOpen: false });
  };

  render() {
    const { templateEditor, includeSubject } = this.state;
    console.log("Templates: ", this.props.templates);
    // JSX
    return (
      <Container className="template">
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={this.handleClickOpen}
        >
          New Template
        </Button>

        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Template</DialogTitle>
          <DialogContent>
            <TemplateFormUI
              templateEditor={templateEditor}
              onEditorStateChange={this.onEditorStateChange}
              handleChange={this.handleChange}
              handleChecked={this.handleChecked}
              includeSubject={includeSubject}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addTemplate} color="primary">
              Save template
            </Button>
          </DialogActions>
        </Dialog>

        {this.props.templates.length > 0
          ? this.props.templates.map(({ templateName }, key) => (
              <Card className="template-card" key={key}>
                <CardContent id="template-card__content">
                  <Grid container justify="space-between" alignItems="center">
                    <Grid>
                      <p> <b>{ key + 1 }</b> - { templateName }</p>
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
