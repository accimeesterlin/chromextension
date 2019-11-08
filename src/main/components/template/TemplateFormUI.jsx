import React from "react";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import PropTypes from 'prop-types';
import { stateToHTML } from "draft-js-export-html";

import {
    TextField,
    Checkbox,
    FormControlLabel,
  } from "@material-ui/core";

const TemplateFormUI = (props) => {
  const isEditMode = props.isEditMode;
  
  const onEditorStateChange = (editor) => {
    const currentEditorContent = editor.getCurrentContent();
    const editorSourceHTML = stateToHTML(currentEditorContent);
    props.handleEditor(editor, editorSourceHTML);
  };

  if (!props.templateInputs) return 'No matching template';
  
  const {
    includeSubject,
    templateEditor,
    templateName,
    templateSubject
  } = props.templateInputs;

  const content = templateEditor.getCurrentContent();
  const editor = isEditMode ? EditorState.createWithContent(content) : templateEditor;


  return (
    <form>
      <TextField
        label="Template name:"
        fullWidth={true}
        name="templateName"
        value={templateName}
        onChange={props.handleChange}
      />

      <FormControlLabel
        label="Include Subject"
        id="includeSubject"
        name="includeSubject"
        control={
          <Checkbox
            checked={includeSubject || false}
            onChange={props.handleChange}
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
          onChange={props.handleChange}
        />
      ) : null}

      <Editor
        initialEditorState={editor}
        defaultEditorState={editor}
        toolbarClassName="template-toolbarClassName"
        wrapperClassName="template-wrapperClassName"
        editorClassName="template-editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </form>
  );
}

TemplateFormUI.propTypes = {
    editTemplate: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleEditor: PropTypes.func.isRequired,
    templateInputs: PropTypes.object.isRequired,
    isEditMode: PropTypes.bool
};


export default TemplateFormUI;
