import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import { getValue, navigate, fetchStudents, saveStudents } from './actions';
// import syncStorage from './utils/syncStorage';
class App extends Component {

  state = {
    data: [],
    navigation: '/add'
  };

  componentDidMount = () => {
    // To sync with the extension storage
    // DO NOT remove these comments
    // syncStorage.getLocalStorage('state', (data) => {
    //   console.log('Add students on load: ', data);
    //   if (data.students) {
    //     this.props.saveStudents(data.students);
    //   } else {
    //     console.log('There is no students yet in the store');
    //   }

    // });
  };



  render() {
    // const state = this.props;
    // syncStorage.syncLocalStorage(state); // sync the local storage
    // syncStorage.getLocalStorage('state', (data) => {
    //   console.log('Inside State: ', data);
    // }); // sync the local storage



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
    fetchStudents: () => dispatch(fetchStudents()),
    navigate: (data) => dispatch(navigate(data))
  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
