/*eslint-disable */

import store from '../store/reduxStore';
import * as types from '../actions/types';

const dispatch = store.dispatch;

export const integrateGmail = () => {
    const options = {
        interactive: true
    };
    chrome.identity.getAuthToken(options, function (token) {
        if (token) {
            localStorage.setItem('isTokenAuthorized', true);
            localStorage.setItem('token', token);

            dispatch({ type: types.GMAIL_INTEGRATION_FULFILLED });
        } else {
            dispatch({ type: types.GMAIL_INTEGRATION_REJECTED });
        }
    });
};