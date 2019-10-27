import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import reducers from '../reducers';

import promise from 'redux-promise-middleware';
import logger from 'redux-logger'

import gmailMiddleware from '../middleware/gmailMiddleware';
import tutorMiddleware from '../middleware/tutorMiddleware';
import { isDevMode } from '../utils/environmentUtils';

const middlewares = [
    promise,
    gmailMiddleware,
    tutorMiddleware
]

if (isDevMode) {
    middlewares.push(logger);
}

const reduxDevTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = reduxDevTools && isDevMode ?
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