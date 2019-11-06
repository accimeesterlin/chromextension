import React from "react";
import PropTypes from "prop-types";
import { Button, CardContent } from "@material-ui/core";


const DisplayTemplates = props => {
  if (!props.templates.length) return null;


  const displayContentPreview = (msg) => {
    if (msg) {
      return msg.slice(0, 30) + '...'
    }
  };

  const getTemplateText = (editor) => {
    const content = editor.getCurrentContent().getPlainText();
    const preview = displayContentPreview(content);
    return preview;
  };

  return <div>
      <h2>Total Templates:  {props.templates.length}</h2>
      {props.templates.map(({ templateName, templateEditor }, key) => (
        <div className="display-templates" key={key}>
          <p>{templateName}</p>
          <p>{getTemplateText(templateEditor)}</p>
          <Button>Delete</Button>
        </div>
      ))}
  </div>;
};


DisplayTemplates.propTypes = {
    templates: PropTypes.array.isRequired
}

export default DisplayTemplates;
