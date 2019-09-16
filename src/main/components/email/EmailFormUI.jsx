import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import propTypes from "prop-types";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";

import { TextField } from "@material-ui/core";

const EmailFormUI = (props, { sendEmail }) => {
  
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [editor, setEditor] = useState(EditorState.createEmpty() || {});

  const submit = (e) => {
    e.preventDefault();

    sendEmail(subject, receiver, emailMessage)
  };

  const onEditorStateChange = editorState => {
    const editorSourceHTML = stateToHTML(editorState.getCurrentContent());
    
    setEditor(editorState);
    setEmailMessage(editorSourceHTML);
  };

  return (
    <form onSubmit={submit}>
      <TextField
        value={receiver}
        label="To:"
        fullWidth={true}
        name="receiver"
        onChange={(e) => setReceiver(e.target.value)}
      />
      <TextField
        value={subject}
        label="Subject:"
        fullWidth={true}
        name="subject"
        onChange={(e) => setSubject(e.target.value)}
      />

     { props.children }

      <Editor
        editorState={editor}
        defaultEditorState={editor}
        toolbarClassName="email-toolbarClassName"
        wrapperClassName="email-wrapperClassName"
        editorClassName="email-editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </form>
  );
}

EmailFormUI.propTypes = {
    sendEmail: propTypes.func.isRequired
};

export default EmailFormUI;
