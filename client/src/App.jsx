import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import { getValue, navigate, saveStudents, deleteStudent } from './actions';
import syncStorage from './utils/syncStorage';

class App extends Component {

  state = {
    data: [],
    navigation: '/add'
  };

  componentDidMount = () => {
    // To sync with the extension storage
    // DO NOT remove these comments
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
  // chrome.storage.sync.get(['students'], function(students) {
  //   console.log('Students: ', students);

  // });


  render() {

    switch (this.props.url) {
      case '/home':
        return <Home {...this.props} />
      case '/add':
        return <AddStudent {...this.props} />

      case '/delete':
        return <DeleteStudent {...this.props} />

      default:
        return <Home {...this.props} />;
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
    deleteStudent: (email) => dispatch(deleteStudent(email)),
    navigate: (data) => dispatch(navigate(data))
  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
