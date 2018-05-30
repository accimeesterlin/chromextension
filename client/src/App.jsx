import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Home from './components/home/Home';
import store from './store';

class App extends Component {

  state = {
    data: []
  };

  componentDidMount = () => {

    console.log(store.getState());
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
    const state = store.getState() // entire state;

    switch (state.navigation) {
      case '/home':
        return <Home />

      default:
        return <Home />;
    }

  }
}


export default App;
