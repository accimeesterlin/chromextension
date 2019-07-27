import React from "react";
import { Editor } from "react-draft-wysiwyg";
import propTypes from "prop-types";

import {
    MenuItem,
    TextField,
    Select
  } from "@material-ui/core";

function EmailFormUI({
  sendEmail,
  receiver,
  handleChange,
  subject,
  templates = [],
  emailTemplate,
  selectTemplate,
  renderTemplateSelection,
  editorState,
  onEditorStateChange
}) {
  return (
    <form onSubmit={sendEmail}>
      <TextField
        value={receiver}
        label="To:"
        fullWidth={true}
        name="receiver"
        onChange={handleChange}
      />
      <TextField
        value={subject}
        label="Subject:"
        fullWidth={true}
        name="subject"
        onChange={handleChange}
      />

      {templates.length > 0 ? (
        <Select
          value={emailTemplate || 'none'}
          autoWidth={true}
          onChange={selectTemplate}
          name="emailTemplate"
          className="email-emailTemplate"
          inputProps={{
            name: "emailTemplate",
            id: "emailTemplate"
          }}
        >
          <MenuItem value="none">None</MenuItem>
          {renderTemplateSelection()}
        </Select>
      ) : null}

      <Editor
        editorState={editorState}
        defaultEditorState={editorState}
        toolbarClassName="email-toolbarClassName"
        wrapperClassName="email-wrapperClassName"
        editorClassName="email-editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      {/* {this.renderSubmitButton()} */}
    </form>
  );
}

EmailFormUI.propTypes = {
    sendEmail: propTypes.func.isRequired,
    receiver: propTypes.string.isRequired,
    subject: propTypes.string.isRequired,
    handleChange: propTypes.func.isRequired,
    templates: propTypes.array,
    emailTemplate: propTypes.string || propTypes.number,
    selectTemplate: propTypes.func.isRequired,
    renderTemplateSelection: propTypes.func.isRequired,
    editorState: propTypes.object.isRequired,
    onEditorStateChange: propTypes.func.isRequired,
};

export default EmailFormUI;
