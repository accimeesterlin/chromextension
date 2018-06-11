import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import AddStudent from './components/addStudent/AddStudent';
import DeleteStudent from './components/deleteStudent/DeleteStudent';
import TutorInfo from './components/tutorInfo/TutorInfo';

class Route extends Component {

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
    const { displayNotification } = this;

    switch (this.props.url) {
      case '/home':
        return <Home displayNotification={displayNotification} />

      case '/add':
        return <AddStudent displayNotification={displayNotification} />

      case '/delete':
        return <DeleteStudent displayNotification={displayNotification} />

      case '/tutor':
        return <TutorInfo displayNotification={displayNotification} />

      default:
        return <Home displayNotification={displayNotification} />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const RouteComponent = connect(mapStateToProps)(Route)
export default RouteComponent;
