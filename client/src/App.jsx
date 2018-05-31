import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import { getValue, navigate, fetchStudents, test } from './actions';

class App extends Component {

  state = {
    data: [],
    navigation: '/add'
  };



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
    fetchStudents: () => dispatch(fetchStudents()),
    navigate: (data) => dispatch(navigate(data))
  }
};

const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppComponent;
