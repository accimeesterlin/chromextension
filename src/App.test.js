import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from './App';

import configureStore from 'redux-mock-store'

const middlewares = [];
const mockStore = configureStore(middlewares)

const initialState = {
  email: {},
  tutor: {},
  students: {},
  events: {},
  gmail: {},
  route: {},
};


it('App.js snapshot', () => {
  
  const store = mockStore(initialState);
  
  const tree =renderer
    .create(
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot();
});
