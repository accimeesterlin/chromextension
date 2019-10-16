import React from "react";
import propTypes from "prop-types";

import { TextField } from "@material-ui/core";

const EmailFormUI = ({ subject, receiver, updateReceiverDetails }) => {
  const handleChange = ({ target }) => {
    const { name, value } = target;
    updateReceiverDetails({ [name]: value });
  };


  return (
    <form >
      <TextField
        value={receiver}
        label="To:"
        fullWidth={true}
        name="email"
        onChange={handleChange}
      />
      <TextField
        value={subject}
        label="Subject:"
        fullWidth={true}
        name="subject"
        onChange={handleChange}
      />
    </form>
  );
};

EmailFormUI.propTypes = {
  subject: propTypes.string,
  receiver: propTypes.string,
  updateReceiverDetails: propTypes.func
  
};

export default EmailFormUI;
