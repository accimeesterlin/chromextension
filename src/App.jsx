import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/home/Home';


import "./App.scss";


const Student = () => {
  return (
    <h2>I am the Student Page</h2>
  );
};




export default class App extends Component {

  render() {
    return (
      <div className="app">

        <Route exact path='/' component={Home} />
        <Route path='/student' component={Student} />
        {/* <Route path='/tutor/info' component={TutorInfo} />
        <Route path='/upcoming/session' component={UpComingSession} /> */}
      </div>
    );
  }
}