import React, { Component } from "react";
import PropTypes from "prop-types";

import { Button, CardContent } from "@material-ui/core";
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
      templates: props.templates
    };
  }


  submitTemplate = event => {
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

  };

  searchTemplate = ({ target }) => {
    const value = target.value.toLowerCase();
    const templates = this.props.templates.filter(({ templateName }) =>
      templateName.toLowerCase().includes(value)
    );
    this.setState({ templates });
  };

  templateForm = () => {
    return <TemplateFormUI
      updateTemplateInput={this.props.updateTemplateInput}
      templateInputs={this.props.templateInputs}
      updateTemplateEditorInput={this.props.updateTemplateEditorInput}
    />
  }

  searchTemplateByName = (value) => {
    const filteredTemplate = this.props.templates.filter((template) => {
      const { templateName } = template;
      if (templateName.toLowerCase().indexOf(value) !== -1) {
        return template
      }
    });

    this.setState({ templates: filteredTemplate });
  };

  saveTemplate = () => {
    const templateInputs = this.props.templateInputs;
    this.props.addTemplate(templateInputs);
    this.props.resetTemplateInputs();
  };

  isFormValid = () => {
    const { templateEditor, templateName, templateSubject } = this.props.templateInputs;

    if (templateName && templateSubject && templateEditor.getCurrentContent().hasText()) {
      return true
    }

    return false;
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
          <Button
            variant="outlined"
            color="primary"
            type="submit"
          >
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
          templates={this.props.templates}
        />
      </Content>
    );
  }
}

TemplateUI.propTypes = {
  templates: PropTypes.array.isRequired,
  updateTemplateInput: PropTypes.func.isRequired,
  updateTemplateEditorInput: PropTypes.func.isRequired,
  addTemplate: PropTypes.func.isRequired,
  resetTemplateInputs: PropTypes.func.isRequired,
  templateInputs: PropTypes.object.isRequired,
};
