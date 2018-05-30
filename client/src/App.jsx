import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    data: []
  };

  componentDidMount = () => {
    axios({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'GET'
    })
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };

  displayUsers = (users) => {

    return users.map((user, index) => (
      <div key={index}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>
    ));
  };

  render() {
    return (
      <div className="App" style={Style.container}>
        <h2>React app | Extension</h2>
        {this.displayUsers(this.state.data)}

      </div>
    );
  }
}

const Style = {
  container: {
    width: '600px',
    height: '600px'
  }
};

export default App;
