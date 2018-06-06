import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import TutorInfo from './components/tutorInfo/TutorInfo';
import { getValue, navigate, saveStudents, deleteStudent, saveTutorInfo, fetchGoogleSheetStudent } from './actions';
// import syncStorage from './utils/syncStorage';

class App extends Component {

  state = {
    data: [],
    navigation: '/add'
  };

  displayNotification = () => {
    const { notification, notificationMessage } = this.props;
    if (notification) {

      return (<div className='notication'>
        <p>{notificationMessage}</p>
      </div>);
    }
  };

  // getStudentsFromLocalStorage = () => {
  //   const { saveStudents } = this.props;

  //   // Get Students from Storage on loads
  //   syncStorage.getLocalStorage('students', function (data) {
  //     const students = data.students;

  //     if (students.length > 0) {
  //       for (let i = 0; i < students.length; i++) {
  //         console.log('State: ', students[i]);
  //         saveStudents(students[i]);
  //       }
  //     } else {
  //       console.log('Storage is empty');
  //     }
  //   });
  // };

  // // Get Tutor Infor from Local Storage
  // getTutorInfoFromLocalStoraage = () => {
  //   const { saveTutorInfo } = this.props;
  //   const info = ['tutor_name', 'google_sheet_url']; // data to get

  //   for (let i = 0; i < info.length; i++) {
  //     chrome.storage.sync.get(info[i], function (data) {
  //       const key = info[i];
  //       saveTutorInfo({ [key]: data[key] });
  //     })
  //   }

  // };

  componentDidMount = () => {
    // this.getStudentsFromLocalStorage();
    // this.getTutorInfoFromLocalStoraage();

  };
  // chrome.storage.sync.get(['students'], function(students) {
  //   console.log('Students: ', students);

  // });


  render() {
    const { props, displayNotification } = this;

    switch (this.props.url) {
      case '/home':
        return <Home {...props} displayNotification={displayNotification} />
      case '/add':
        return <AddStudent {...props} displayNotification={displayNotification} />

      case '/delete':
        return <DeleteStudent {...props} displayNotification={displayNotification} />

      case '/tutor':
        return <TutorInfo {...props} displayNotification={displayNotification} />

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
    fetchGoogleSheetStudent: (sheet_id) => dispatch(fetchGoogleSheetStudent(sheet_id)),
    deleteStudent: (email) => dispatch(deleteStudent(email)),
    navigate: (data) => dispatch(navigate(data))
  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
