import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";

const FormEditor = ({ onEditorChange, editorContent, name, updateReceiverMsg }) => {
  const [textEditor, setTextEditor] = useState(EditorState.createEmpty() || {});

  useEffect(() => {
    if (typeof editorContent === 'object') {
      setTextEditor(editorContent);
    }
  }, [editorContent]);

  const onEditorStateChange = editorState => {
    const currentContent = editorState.getCurrentContent();
    const editorSourceHTML = stateToHTML(currentContent);

    setTextEditor(editorState); // update the state of the editor
    updateReceiverMsg(editorSourceHTML);
    onEditorChange(editorSourceHTML); // event listener for the parent
  };

  return (
    <Editor
      editorState={textEditor}
      defaultEditorState={textEditor}
      toolbarClassName={`${name}-toolbarClassName`}
      wrapperClassName={`${name}-wrapperClassName`}
      editorClassName={`${name}-editorClassName`}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

FormEditor.propTypes = {
  onEditorChange: PropTypes.func.isRequired,
  updateReceiverMsg: PropTypes.func.isRequired,
  editorContent: PropTypes.object,
  name: PropTypes.string
};

export default FormEditor;
