/*eslint-disable */
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { initializeApp } from "./actions/actionCreators";
import selectn from "selectn";

// Main App with Full Web Page
import {
  Tutor,
  Home,
  Student,
  EditStudent,
  Profile,
  Calendar,
  Email,
  Template,
  Dashboard,
  TemplateEdit
} from "./main/components";

// Sidebar App
import {
  HomeWithNav,
  AddStudentWithNav,
  DeleteStudentWithNav,
  UpcomingSessionWithNav,
  InfoWithNav,
  ErrorComponentWithNav
} from "./sidebar/components/pages/index.jsx";

import "./reset.scss";
import "./global.scss";
import "./App.scss";

export class App extends Component {
  componentDidMount = () => {
    const { isAppInitialized, initializeApp } = this.props;
    if (!isAppInitialized && chrome && chrome.identity) {
      initializeApp();
    }
  };

  handleClose = () => {};

  render() {
    return (
      <div className="app">
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          key={"top,right"}
          open={this.props.openNotification}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">{this.props.notificationMessage}</span>
          }
        />
        <div className="app-content">
          <Route exact path="/" component={HomeWithNav} />
          <Route path="/student/add" component={AddStudentWithNav} />
          <Route path="/student/delete" component={DeleteStudentWithNav} />
          <Route path="/tutor" component={InfoWithNav} />
          <Route path="/upcoming/session" component={UpcomingSessionWithNav} />
          <Route path="/error/:message" component={ErrorComponentWithNav} />

          {/* New Design for the Chrome Web Page */}
          <Route path="/new/home" component={Home} />
          <Route exact path="/new/template" component={Template} />
          <Route exact path="/new/template/:id" component={TemplateEdit} />
          <Route exact path="/new/student" component={Student} />
          <Route exact path="/new/student/:id" component={EditStudent} />
          <Route path="/new/profile" component={Profile} />
          <Route path="/new/calendar" component={Calendar} />
          <Route path="/new/email" component={Email} />
          <Route path="/new/tutor" component={Tutor} />
          <Route path="/new/dashboard" component={Dashboard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const openNotification = selectn("notifications.open", state);
  const notificationMessage = selectn("notifications.message", state);
  const notificationType = selectn("notifications.notificationType", state);
  const isAppInitialized = selectn("tutor.isAppInitialized", state);

  return {
    openNotification,
    notificationMessage,
    notificationType,
    isAppInitialized
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initializeApp: () => {
      dispatch(initializeApp());
    }
  };
};
const AppUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppUI;
