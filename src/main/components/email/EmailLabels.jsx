/*eslint-disable */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { MenuItem, Select } from "@material-ui/core";
import { isEmpty } from "lodash";

const EmailLablels = ({ loadMessages, labels }) => {
  const [label, setLabel] = useState('Central Support');

  const selectGmailLabel = event => {
    const { value } = event.target;

    setLabel(value);
    const shouldEmptyMessages = true;
    // TODO
    // Remove the below code after refactored the load messages function
    const nextPageToken = null;
    const query = null;
    const token = null;
    if (chrome && chrome.identity) {
      loadMessages(token, nextPageToken, value, query, shouldEmptyMessages);
    }
  };

  if (isEmpty(labels)) return null;

  // JSX
  return (
    <Select
      value={label}
      // autoWidth={true}
      onChange={selectGmailLabel}
      className="email-gmail__label"
    >
      <MenuItem value={label}>{label}</MenuItem>
      {labels.map(({ id, name }) => (
        <MenuItem value={id} key={id}>
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};

EmailLablels.propTypes = {
  loadMessages: PropTypes.func.isRequired,
  labels: PropTypes.array.isRequired
};

export default EmailLablels;
