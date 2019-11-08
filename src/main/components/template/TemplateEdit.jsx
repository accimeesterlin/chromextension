import React, { Component } from "react";
import { connect } from "react-redux";
import selectn from "selectn";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";

import { Button } from "@material-ui/core";
import TemplateFormUI from "./TemplateFormUI";

import { editTemplate, updateSelectedTemplate } from "../../../actions/actionCreators";
import Content from "../common/content/Content";

import "./template.scss";


class TemplateEditUI extends Component {
  state = {
    includeSubject: false,
    templateContent: "",
    templateEditor: EditorState.createEmpty() || {},
    templateId: "",
    templateName: "",
    templateSubject: "",
    isLoaded: false,
    templateIndex: 0
  };

  componentDidMount = () => {
    if (!this.state.isLoaded) {
      const { match, templates } = this.props;
      const templateIndex = parseInt(match.params.id);
      const currentTemplate = templates[templateIndex];
      this.setState({
        ...currentTemplate,
        templateIndex,
        isLoaded: true
      });
    }
  };


  handleChange = ({ target }) => {
    const name = target.name;
    const value = name === "includeSubject" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  };

  handleEditor = (editor, content) => {
    this.setState({
      templateEditor: editor,
      templateContent: content
    });
  };

  updateTemplate = event => {
    event.preventDefault();
    const templateIndex = this.state.templateIndex;
    this.props.updateSelectedTemplate(this.state, templateIndex);
  };

  render() {
    // JSX
    return (
      <Content className="template-edit" {...this.props}>
        <TemplateFormUI
          templateInputs={this.state}
          isEditMode={true}
          handleChange={this.handleChange}
          handleEditor={this.handleEditor}
          editTemplate={this.props.editTemplate}
        />

        <Button
          variant="outlined"
          color="primary"
          onClick={this.updateTemplate}
        >
          Update template
        </Button>
      </Content>
    );
  }
}

TemplateEditUI.propTypes = {
  match: PropTypes.object.isRequired,
  templates: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  const templates = selectn("templates.listTemplates", state);

  return {
    templates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editTemplate: id => {
      dispatch(editTemplate(id));
    },
  
    updateSelectedTemplate: (template, index) => {
      dispatch(updateSelectedTemplate(template, index));
    },
    
  };
};

const TemplateEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(TemplateEditUI);

export default TemplateEdit;
