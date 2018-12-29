import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import {
  Home,
  AddStudent,
  DeleteStudent,
  UpcomingSession,
  Info,
  ErrorComponent
} from './components';

import "./App.scss";



export default class App extends Component {

  render() {
    return (
      <div className="app">

        <Route exact path='/' component={Home} />
        <Route path='/student/add' component={AddStudent} />
        <Route path='/student/delete' component={DeleteStudent} />
        <Route path='/tutor' component={Info} />
        <Route path='/upcoming/session' component={UpcomingSession} />
        <Route path='/error/:message' component={ErrorComponent} />
      </div>
    );
  }
}