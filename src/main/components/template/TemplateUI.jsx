import React, { Component } from "react";

import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import SearchBox from "../common/searchBox/SearchBoxUI";

import TemplateFormUI from "./TemplateFormUI";

import "./template.scss";

import Content from "../common/content/Content";

export default class TemplateUI extends Component {
  initialState = {
    templateEditor: EditorState.createEmpty() || {},
    templateContent: "",
    isOpen: false,
    includeSubject: false,
    templateName: "",
    templateSubject: "",
    searchClient: {},
    templates: this.props.templates || []
  };
  state = this.initialState;

  onEditorStateChange = templateEditor => {
    const currentEditorContent = templateEditor.getCurrentContent();
    const editorSourceHTML = stateToHTML(currentEditorContent);
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

  searchTemplate = ({ target }) => {
    const value = target.value.toLowerCase();
    const templates = this.props.templates.filter(({ templateName }) =>
      templateName.toLowerCase().includes(value)
    );
    this.setState({ templates });
  };

  render() {
    const { templateEditor, includeSubject } = this.state;
    // JSX
    return (
      <Content className="template" {...this.props}>
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

        <SearchBox
          label="Search template" 
          items={this.state.templates}
          filterByName="templateName"
          name="templateName">
          <DisplayTemplates
              handleClose={this.handleClose}
              addTemplate={this.addTemplate}
            />
        </SearchBox>
      </Content>
    );
  }
}

function DisplayTemplates({ templateName, handleClose, addTemplate, num }) {
  
  return (
    <Card className="template-card">
      <CardContent id="template-card__content">
        <Grid container justify="space-between" alignItems="center">
          <Grid>
            <p>
              <b>{num}</b> - {templateName}
            </p>
          </Grid>
          <Grid className="template-card__buttons">
            <Button onClick={handleClose} color="primary">
              Copy
            </Button>
            <Button onClick={addTemplate} color="primary">
              Edit
            </Button>

            <Button onClick={addTemplate} color="primary">
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
