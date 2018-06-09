import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import TutorInfo from './components/tutorInfo/TutorInfo';
import {
  getValue,
  navigate,
  saveStudents,
  deleteStudent,
  handleError,
  loadLastStudent,
  resetStudents
} from './actions';

class App extends Component {

  state = {
    data: [],
    navigation: '/add'
  };

  // Display Notification and Notification Message
  displayNotification = () => {
    const { notification, notificationMessage } = this.props;
    if (notification) {
      return (<div className='notication'>
        <p>{notificationMessage}</p>
      </div>);
    }
  };

  // chrome.storage.sync.get(['students'], function(students) {
  //   console.log('Students: ', students);

  // });


  render() {
    const { props, displayNotification } = this;

    switch (this.props.url) {
      case '/home':
        return <Home
          {...props}
          displayNotification={displayNotification} />

      case '/add':
        return <AddStudent
          {...props}
          displayNotification={displayNotification} />

      case '/delete':
        return <DeleteStudent
          {...props}
          displayNotification={displayNotification} />

      case '/tutor':
        return <TutorInfo
          {...props}
          displayNotification={displayNotification} />

      default:
        return <Home {...props} displayNotification={displayNotification} />;
    }


  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getValue: (data) => dispatch(getValue(data)),
    saveStudents: (data) => dispatch(saveStudents(data)),
    resetStudents: () => dispatch(resetStudents()),
    loadLastStudent: (student) => dispatch(loadLastStudent(student)),
    deleteStudent: (email) => dispatch(deleteStudent(email)),
    handleError: (error) => dispatch(handleError(error)),
    navigate: (data) => dispatch(navigate(data)),


  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
