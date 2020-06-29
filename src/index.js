import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './store/index';
import { HashRouter } from 'react-router-dom';

import './common/reset.scss';
import './index.scss';
import App from './App';


ReactDOM.render(
    <Provider>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
    , document.getElementById('root'));

