import React from "react";

import "./sidebar.scss";

// TODO:
// Make it more dynamic

const SidebarUI = props => {
  const { navigateToContent } = props;
  // JSX
  return (
    <div className="sidebar">
      <div className="sidebar-box">
        <p data-name="email" onClick={navigateToContent}>
          Email
        </p>
      </div>
      <div className="sidebar-box">
        <p data-name="student" onClick={navigateToContent}>
          Student
        </p>
      </div>
      <div className="sidebar-box">
        <p data-name="tutor" onClick={navigateToContent}>
          Tutor
        </p>
      </div>

      <div className="sidebar-box">
        <p data-name="calendar" onClick={navigateToContent}>
          Calendar
        </p>
      </div>

      <div className="sidebar-box">
        <p data-name="email-templates" onClick={navigateToContent}>
          Email Templates
        </p>
      </div>
    </div>
  );
};

export default SidebarUI;
