import React from "react";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from 'prop-types';
import { stateToHTML } from "draft-js-export-html";

import {
    TextField,
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

const TemplateFormUI = (props) => {
  const onEditorStateChange = (editor) => {
    const currentEditorContent = editor.getCurrentContent();
    const editorSourceHTML = stateToHTML(currentEditorContent);
    props.updateTemplateEditorInput(editor);
    props.updateTemplateInput({ templateContent: editorSourceHTML });
  };

  const {
    includeSubject,
    templateEditor,
    templateName,
    templateSubject
  } = props.templateInputs;


  const handleChange = ({ target }) => {
    const name = target.name;
    const value = name === 'includeSubject' ? target.checked : target.value;

    props.updateTemplateInput({
      [name]: value
    });
  };
  
  
  return (
    <form>
      <TextField
        label="Template name:"
        fullWidth={true}
        name="templateName"
        value={templateName}
        onChange={handleChange}
      />

      <FormControlLabel
        label="Include Subject"
        id="includeSubject"
        name="includeSubject"
        control={
          <Checkbox
            checked={includeSubject}
            onChange={handleChange}
            color="primary"
            inputProps={{
              "aria-label": "primary checkbox"
            }}
          />
        }
      />

      {includeSubject ? (
        <TextField
          label="Subject:"
          fullWidth={true}
          value={templateSubject}
          name="templateSubject"
          onChange={handleChange}
        />
      ) : null}

      <Editor
        initialEditorState={templateEditor}
        toolbarClassName="template-toolbarClassName"
        wrapperClassName="template-wrapperClassName"
        editorClassName="template-editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </form>
  );
}

TemplateFormUI.propTypes = {
    updateTemplateInput: PropTypes.func.isRequired,
    updateTemplateEditorInput: PropTypes.func.isRequired,
    templateInputs: PropTypes.object.isRequired
};


export default TemplateFormUI;
