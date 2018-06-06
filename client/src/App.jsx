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
  saveTutorInfo,
  handleError,
  fetchGoogleSheetStudent,
  saveGoogleSheetStudents
} from './actions';
import syncStorage from './utils/syncStorage';

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



  // Get Students from Storage on loads
  getStudentsFromLocalStorage = () => {
    const { saveStudents } = this.props;
    syncStorage.getLocalStorage('students', function (data) {
      const students = data.students;
      if (students.length > 0) {
        for (let i = 0; i < students.length; i++) {
          console.log('State: ', students[i]);
          saveStudents(students[i]);
        }
      } else {
        console.log('Storage is empty');
      }
    });
  };

  // Get Tutor Infor from Local Storage
  getTutorInfoFromLocalStorage = () => {
    const { saveTutorInfo } = this.props;
    const info = ['tutor_name']; // data to get
    for (let i = 0; i < info.length; i++) {
      try {
        chrome.storage.sync.get(info[i], function (data) {
          const key = info[i];
          saveTutorInfo({ [key]: data[key] });
        })
      } catch (error) {
        // TODO
      }
    }

  };

  // On load, get students object and tutor info from local storage
  componentDidMount = () => {
    this.getStudentsFromLocalStorage();
    this.getTutorInfoFromLocalStorage();
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
    saveTutorInfo: (data) => dispatch(saveTutorInfo(data)),
    deleteStudent: (email) => dispatch(deleteStudent(email)),
    saveGoogleSheetStudents: (students) => dispatch(saveGoogleSheetStudents(students)),
    handleError: (error) => dispatch(handleError(error)),
    navigate: (data) => dispatch(navigate(data)),
    fetchGoogleSheetStudent: (sheet_id) => dispatch(fetchGoogleSheetStudent(sheet_id))

  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
