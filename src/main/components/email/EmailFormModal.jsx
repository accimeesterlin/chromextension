import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";

import EmailFormUI from "./EmailFormUI";
import TemplateSelection from "./TemplateSelection";
import FormEditor from "../common/FormEditor";

const EmailFormModal = props => {
  const {
    sendEmail,
    templates,
    updateTemplate,
    currentTemplate,
    updateReceiverDetails,
    updateReceiverMsg,
    receiver,
    subject
  } = props;
  const [isModalOpen, setIsModelOpen] = useState(false);

  // Pulling from redux
  const { templateEditor } = currentTemplate;

  // Attach a click event on the props.children element
  const childElement = React.cloneElement(props.children, {
    onClick: () => setIsModelOpen(true)
  });

  const displayContent = () => {
    return (
      <React.Fragment>
        <EmailFormUI
          subject={subject}
          receiver={receiver}
          updateReceiverDetails={updateReceiverDetails}
        />

        <TemplateSelection
          templates={templates}
          updateTemplate={updateTemplate}
        />

        <FormEditor
          onEditorChange={() => ""}
          editorContent={templateEditor}
          name="email"
          updateReceiverMsg={updateReceiverMsg}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      {childElement}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModelOpen(true)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Message</DialogTitle>
        
        <DialogContent>
          {displayContent()}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setIsModelOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={sendEmail} type="submit" color="primary">
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EmailFormModal.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      templateId: PropTypes.number,
      templateContent: PropTypes.string.isRequired,
      templateSubject: PropTypes.string.isRequired,
      templateName: PropTypes.string.isRequired,
      templateEditor: PropTypes.string.isRequired
    }).isRequired
  ),
  receiver: PropTypes.string,
  subject: PropTypes.string,
  currentTemplate: PropTypes.object.isRequired,
  sendEmail: PropTypes.func.isRequired,
  updateTemplate: PropTypes.func.isRequired,
  updateReceiverDetails: PropTypes.func.isRequired,
  updateReceiverMsg: PropTypes.func.isRequired

};

export default EmailFormModal;
