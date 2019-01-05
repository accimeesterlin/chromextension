import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  HomeWithNav,
  AddStudentWithNav,
  DeleteStudentWithNav,
  UpcomingSessionWithNav,
  InfoWithNav,
  ErrorComponentWithNav
} from './components';

import "./App.scss";



export default class App extends Component {

  render() {
    return (
      <div className="app">

        <Route exact path='/' component={HomeWithNav} />
        <Route path='/student/add' component={AddStudentWithNav} />
        <Route path='/student/delete' component={DeleteStudentWithNav} />
        <Route path='/tutor' component={InfoWithNav} />
        <Route path='/upcoming/session' component={UpcomingSessionWithNav} />
        <Route path='/error/:message' component={ErrorComponentWithNav} />
      </div>
    );
  }
}