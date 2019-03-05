import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';

it('renders without crashing', () => {
  global.ga = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<HashRouter>
    <App />
  </HashRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
