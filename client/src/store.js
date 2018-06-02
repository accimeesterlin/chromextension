import {
    createStore,
    applyMiddleware
} from 'redux';
// import logger from 'redux-logger';
import reducers from './reducers';
import promise from 'redux-promise-middleware';

const store = createStore(reducers, applyMiddleware(promise()));

export default store;