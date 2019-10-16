import React from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import { getSnippet, getSubject, getDate, getReceiver } from '../../selectors/emailSelectors';

const EmailMessages = ({ messages }) => {
  if (isEmpty(messages)) return null;

  
  // JSX
  return messages.map(({ payload, snippet }, index) => (
    <div className="email-preview" key={index}>
      <p>{getReceiver(payload)}</p>
      <p>{getSubject(payload)} - {getSnippet(snippet)}</p>
      <p>{getDate(payload)}</p>
    </div>
  ));
};

EmailMessages.propTypes = {
  messages: PropTypes.array.isRequired
};

export default EmailMessages;
