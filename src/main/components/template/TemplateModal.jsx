import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const TemplateModal = props => {
  const [isOpen, setIsOpen] = useState(false);
  const isFormValid = props.isFormValid();

  const addTemplate = () => {
    props.saveTemplate();
    setIsOpen(false)
  };

  // Attach a click event on the props.children element
  const childElement = React.cloneElement(props.children, {
    onClick: () => setIsOpen(true)
  });

  return (
    <React.Fragment>
      {childElement}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Template</DialogTitle>
        <DialogContent>
          {props.templateForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button disabled={!isFormValid} onClick={addTemplate} color="primary">
            Save template
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

TemplateModal.propTypes = {
  addTemplate: PropTypes.func.isRequired,
  templateForm: PropTypes.func.isRequired,
  saveTemplate: PropTypes.func.isRequired,
  isFormValid: PropTypes.func.isRequired,
};

export default TemplateModal;
