import renderer from 'react-test-renderer';
import React from 'react';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { App } from './App';

import configureStore from 'redux-mock-store'

const middlewares = [];
const mockStore = configureStore(middlewares)


it('App.js snapshot', () => {
  
  const store = mockStore({});
  
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
