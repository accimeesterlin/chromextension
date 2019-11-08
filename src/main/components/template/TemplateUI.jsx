import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";
import { Button } from "@material-ui/core";

import SearchBox from "../common/searchBox/SearchBoxUI";
import DisplayTemplates from "./DisplayTemplates";
import TemplateModal from "./TemplateModal";
import TemplateFormUI from "./TemplateFormUI";

import "./template.scss";

import Content from "../common/content/Content";

export default class TemplateUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      templates: this.props.templates,
      templateInputs: {
        includeSubject: false,
        templateContent: "",
        templateEditor: EditorState.createEmpty() || {},
        templateId: "",
        templateName: "",
        templateSubject: ""
      }
    };
  }

  submitTemplate = event => {
    event.preventDefault();

    this.props.addTemplate(this.state.templateInputs);
  };

  handleChange = ({ target }) => {
    const name = target.name;
    const value = name === "includeSubject" ? target.checked : target.value;

    this.setState((state) => {
      return {
        templateInputs: {
          ...state.templateInputs,
          [name]: value
        }
      }
    });
  };

  handleEditor = (editor, content) => {
    this.setState((state) => {
      return {
        templateInputs: {
          ...state.templateInputs,
          templateContent: content,
          templateEditor: editor
        }
      }
    });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      templates: props.templates
    };
  }

  searchTemplate = ({ target }) => {
    const value = target.value.toLowerCase();
    const templates = this.props.templates.filter(({ templateName }) =>
      templateName.toLowerCase().includes(value)
    );
    this.setState({ templates });
  };

  templateForm = () => {
    return (
      <TemplateFormUI
        templateInputs={this.state.templateInputs}
        handleChange={this.handleChange}
        handleEditor={this.handleEditor}
      />
    );
  };

  searchTemplateByName = value => {
    const templates = this.props.templates;
    if (!templates.length) return [];

    const filteredTemplate = templates.filter(template => {
      const { templateName } = template;
      if (templateName && templateName.toLowerCase().indexOf(value) !== -1) {
        return template;
      }
    });

    this.setState({ templates: filteredTemplate });
  };

  saveTemplate = () => {
    const templateInputs = this.state.templateInputs;
    this.props.addTemplate(templateInputs);
    this.setState({
      templateInputs: {
        includeSubject: false,
        templateContent: "",
        templateEditor: EditorState.createEmpty() || {},
        templateId: "",
        templateName: "",
        templateSubject: ""
      }
    });
  };

  isFormValid = () => {
    const { templateEditor, templateName } = this.state.templateInputs;

    if (templateName &&  templateEditor.getCurrentContent().hasText()) {
      return true;
    }

    return false;
  };

  editTemplate = index => {
    this.props.history.push(`/new/template/${index}`);
  };

  render() {
    // JSX
    return (
      <Content className="template" {...this.props}>
        <TemplateModal
          updateTemplateInput={this.props.updateTemplateInput}
          addTemplate={this.submitTemplate}
          templateForm={this.templateForm}
          saveTemplate={this.saveTemplate}
          isFormValid={this.isFormValid}
        >
          <Button variant="outlined" color="primary" type="submit">
            New Template
          </Button>
        </TemplateModal>

        <SearchBox
          label="Search template"
          filterByName="templateName"
          searchTemplateByName={this.searchTemplateByName}
          name="templateName"
        />

        <DisplayTemplates
          handleClose={this.handleClose}
          templates={this.state.templates}
          deleteTemplate={this.props.deleteTemplate}
          editTemplate={this.editTemplate}
        />
      </Content>
    );
  }
}

TemplateUI.propTypes = {
  templates: PropTypes.array.isRequired,
  addTemplate: PropTypes.func.isRequired,
  deleteTemplate: PropTypes.func.isRequired
};
