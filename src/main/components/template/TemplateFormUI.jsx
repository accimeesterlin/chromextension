import React from "react";
import { Editor } from "react-draft-wysiwyg";
import propTypes from 'prop-types';

import {
    TextField,
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

function TemplateFormUI({ handleChange, handleChecked, includeSubject, templateEditor, onEditorStateChange }) {
  return (
    <form>
      <TextField
        label="Template name:"
        fullWidth={true}
        name="templateName"
        onChange={handleChange}
      />

      <FormControlLabel
        label="Include Subject"
        id="includeSubject"
        control={
          <Checkbox
            onChange={handleChecked("includeSubject")}
            value="includeSubject"
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
    templateEditor: propTypes.object.isRequired,
    onEditorStateChange: propTypes.func.isRequired,
    handleChange: propTypes.func.isRequired,
    handleChecked: propTypes.func.isRequired,
    includeSubject: propTypes.bool,
};


export default TemplateFormUI;
