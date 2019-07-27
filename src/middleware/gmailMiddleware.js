
import * as types from '../actions/types';
import { getGmailMessage } from '../actions/asyncActionCreators';
import { loadToken } from '../utils/authUtils';

const gmailMiddleware = (store) => (next) => (action) => {

    next(action);
    const state = store.getState();
    const dipatch = store.dispatch;
    const token = loadToken();


    switch(action.type) {
        case types.LOAD_MESSAGES_FULFILLED:
            action.payload.data.messages.map(({ id, threadId }) => {
                dipatch(getGmailMessage( id, token ));
            })
            break;

        default:
            break;
    };
};


// Handle this logic on the midddleware side
/*

if (error.data && error.data.statusCode) {
      statusCode = error.data.statusCode;
    }

if (statusCode === 401 && !retry) {
    retry = true;
    window.localStorage.removeItem('token');
    loadToken();
    console.log('New Token generated!!!');
    sendEmailToGoogle(payload, cb);
}
*/

export default gmailMiddleware