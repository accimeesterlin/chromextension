import React, { Component } from "react";
import { connect } from "react-redux";
import selectn from "selectn";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";

import { Button, CardContent } from "@material-ui/core";
import TemplateFormUI from "./TemplateFormUI";

import {
  addTemplate,
  updateTemplateInput,
  updateTemplateEditorInput,
  resetTemplateInputs,
  editTemplate,
  deleteTemplate
} from "../../../actions/actionCreators";

import "./template.scss";

import Content from "../common/content/Content";

class TemplateEditUI extends Component {
  state = {
    includeSubject: false,
    templateContent: "",
    templateEditor: EditorState.createEmpty() || {},
    templateId: "",
    templateName: "",
    templateSubject: ""
  };
  componentDidMount = () => {
    // const templates = this.props.templates;
    // const templateInputs = this.getCurrentTemplate(templates);
    // this.setState({ ...templateInputs });
  };
  getCurrentTemplate = templates => {
    const templateIndex = parseInt(this.props.match.params.id);
    const currentTemplate = templates[templateIndex];
    return currentTemplate;
  };


  handleEditChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    // JSX
    console.log("Props: ", this.props);
    return (
      <Content className="template-edit" {...this.props}>
        <h1>I am the edit component</h1>
        <TemplateFormUI
          updateTemplateInput={this.props.updateTemplateInput}
          templateInputs={this.state}
          handleEditChange={this.handleEditChange}
          isEditMode={true}
          editTemplate={this.props.editTemplate}
          updateTemplateEditorInput={this.props.updateTemplateEditorInput}
        />

        <Button variant="outlined" color="primary">
            Update template
        </Button>
      </Content>
    );
  }
}

TemplateEditUI.propTypes = {};

const mapStateToProps = state => {
  const templates = selectn("templates.listTemplates", state);

  return {
    templates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateTemplateEditorInput: editor => {
      dispatch(updateTemplateEditorInput(editor));
    },

    updateTemplateInput: userInput => {
      dispatch(updateTemplateInput(userInput));
    },

    editTemplate: id => {
      dispatch(editTemplate(id));
    }
  };
};

const TemplateEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateEditUI);

export default TemplateEdit;
