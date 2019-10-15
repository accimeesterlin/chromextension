import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import propTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";

const FormEditor = ({ onEditorChange }) => {
  const [editor, setEditor] = useState(EditorState.createEmpty() || {});

  const onEditorStateChange = editorState => {
    const currentContent = editorState.getCurrentContent();
    const editorSourceHTML = stateToHTML(currentContent);

    setEditor(editorState); // update the state of the editor
    onEditorChange(editorSourceHTML);
  };

  return (
    <Editor
      editorState={editor}
      defaultEditorState={editor}
      toolbarClassName="email-toolbarClassName"
      wrapperClassName="email-wrapperClassName"
      editorClassName="email-editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

FormEditor.propTypes = {
  onEditorChange: propTypes.func.isRequired
};

export default FormEditor;
