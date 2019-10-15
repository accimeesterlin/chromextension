import React, { useState } from "react";
import propTypes from "prop-types";

import { TextField } from "@material-ui/core";

const EmailFormUI = ({ onEmailFormSubmission }) => {
  
  const [receiver, setReceiver] = useState('');
  const [subject, setSubject] = useState('');

  const submit = (e) => {
    e.preventDefault();

    onEmailFormSubmission(receiver, subject);
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
    </form>
  );
}

EmailFormUI.propTypes = {
    onEmailFormSubmission: propTypes.func
};

export default EmailFormUI;
