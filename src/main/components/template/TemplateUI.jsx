import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import {
  Container,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

import "./template.scss";

export default class TemplateUI extends Component {
  initialState = {
    templateEditor: EditorState.createEmpty() || {},
    templateContent: '',
    isOpen: false,
    includeSubject: false,
    templateName: '',
    includeSubject: '',
    templateSubject: ''
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

  addTemplate = (event) => {
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
    const { templateEditor } = this.state;
    console.log("Templates: ", this.props.templates);
    // JSX
    return (
      <Container className="template">
        <h2>New Template</h2>

        <Button
          variant="contained"
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
            <form>
              <TextField
                value={this.state.receiver}
                label="Template name:"
                fullWidth={true}
                name="templateName"
                onChange={this.handleChange}
              />

              <FormControlLabel
                label="Include Subject"
                id="includeSubject"
                control={
                  <Checkbox
                    checked={this.state.checkedA}
                    onChange={this.handleChecked("includeSubject")}
                    value="includeSubject"
                    color="primary"
                    inputProps={{
                      "aria-label": "primary checkbox"
                    }}
                  />
                }
              />

              {this.state.includeSubject ? (
                <TextField
                  value={this.state.receiver}
                  label="Subject:"
                  fullWidth={true}
                  name="templateSubject"
                  onChange={this.handleChange}
                />
              ) : null}

              <Editor
                initialEditorState={templateEditor}
                toolbarClassName="template-toolbarClassName"
                wrapperClassName="template-wrapperClassName"
                editorClassName="template-editorClassName"
                onEditorStateChange={this.onEditorStateChange}
              />
            </form>
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
      </Container>
    );
  }
}
