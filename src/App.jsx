import React, { Component } from "react";
import { Route } from "react-router-dom";


// Main App with Full Web Page
import {
  Tutor,
  Home,
  Student,
  Profile,
  Calendar,
  Email,
  Template,
  Dashboard
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

export default class App extends Component {
  render() {
    return (
      <div className="app">
        
        <div className="app-content">
          <Route exact path="/" component={HomeWithNav} />
          <Route path="/student/add" component={AddStudentWithNav} />
          <Route path="/student/delete" component={DeleteStudentWithNav} />
          <Route path="/tutor" component={InfoWithNav} />
          <Route path="/upcoming/session" component={UpcomingSessionWithNav} />
          <Route path="/error/:message" component={ErrorComponentWithNav} />

          {/* New Design for the Chrome Web Page */}
          <Route path="/new/home" component={Home} />
          <Route path="/new/template" component={Template} />
          <Route path="/new/student" component={Student} />
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
