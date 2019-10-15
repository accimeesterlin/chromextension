import React, { useState } from "react";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@material-ui/core";
import { isEmpty } from "lodash";

const TemplateSelection = ({ templates, setCurrentEmailMessage }) => {
  const [editor, setEditor] = useState();
  const [templateSubject, setTemplateSubject] = useState();
  const [emailMessage, setEmailMessage] = useState();
  const [emailTemplate, setEmailTemplate] = useState();

  const selectTemplate = ({ value: index, name }) => {
    const currentTemplate = templates[index];

    const {
      templateContent,
      templateSubject,
      templateEditor
    } = currentTemplate;

    setEditor(templateEditor);
    setTemplateSubject(templateSubject);
    setEmailMessage(templateContent);
    setCurrentEmailMessage(emailMessage);
    setEmailTemplate(emailTemplate);
    // this.setState({ [name]: index, });
  };

  if (isEmpty(templates)) return null;

  // JSX
  return (
    <Select
      value={emailTemplate || "none"}
      autoWidth={true}
      onChange={e => selectTemplate(e.target)}
      name="emailTemplate"
      className="email-emailTemplate"
      inputProps={{
        name: "emailTemplate",
        id: "emailTemplate"
      }}
    >
      <MenuItem value="none">None</MenuItem>

      {templates.map(({ templateName }, key) => (
        <MenuItem key={key} value={key}>
          {templateName}
        </MenuItem>
      ))}
    </Select>
  );
};

TemplateSelection.propTypes = {
  templates: PropTypes.arrayOf(PropTypes.shape({
    templateId: PropTypes.number,
    templateContent: PropTypes.string.isRequired,
    templateSubject: PropTypes.string.isRequired,
    templateName: PropTypes.string.isRequired,
    templateEditor: PropTypes.string.isRequired
  })).isRequired,
  setCurrentEmailMessage: PropTypes.func.isRequired
};

export default TemplateSelection;
