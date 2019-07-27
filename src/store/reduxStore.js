import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import reducers from '../reducers';

import promise from 'redux-promise-middleware';
import logger from 'redux-logger'

import gmailMiddleware from '../middleware/gmailMiddleware';


const middlewares = [
    logger,
    promise,
    gmailMiddleware
]

const reduxDevTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = reduxDevTools ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'Tutor Pro - Chrome Extension'
    }) : compose;

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(...middlewares)
    )
);

export default store;