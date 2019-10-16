import React, { useState } from "react";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@material-ui/core";
import { isEmpty } from "lodash";

const TemplateSelection = ({ templates, updateTemplate }) => {
  const [currentItem, setCurrentItem] = useState('None');
  
  const selectTemplate = ({ value: index, name }) => {
    const currentTemplate = templates[index];

    setCurrentItem(currentTemplate.templateName); // update state
    updateTemplate(currentTemplate); // update redux store
  };

  if (isEmpty(templates)) return null;

  // JSX
  return (
    <Select
      value={currentItem || "none"}
      autoWidth={true}
      onChange={e => selectTemplate(e.target)}
      name="emailTemplate"
      className="email-emailTemplate"
      inputProps={{
        name: "emailTemplate",
        id: "emailTemplate"
      }}
    >
      <MenuItem value={currentItem}>{ currentItem }</MenuItem>

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
  updateTemplate: PropTypes.func.isRequired
};

export default TemplateSelection;
