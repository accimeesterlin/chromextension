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

const EmailFormModal = props => {
  const { sendEmail, templates } = props;
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);

  const send = msg => {
    // TODO
    // Grab the necessary data it needs
    sendEmail();
    setIsModelOpen(false);
  };

  // Attach a click event on the props.children element
  const childElement = React.cloneElement(props.children, {
    onClick: () => setIsModelOpen(true)
  });

  return (
    <div>
      { childElement }
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModelOpen(true)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Message</DialogTitle>
        <DialogContent>
          <EmailFormUI sendEmail={sendEmail}>
            <TemplateSelection
              setCurrentEmailMessage={send}
              templates={templates}
            />
          </EmailFormUI>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModelOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={send} type="submit" color="primary">
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
  sendEmail: PropTypes.func.isRequired
};

export default EmailFormModal;
