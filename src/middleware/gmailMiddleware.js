/*eslint-disable */
import axios from 'axios';
import * as types from '../actions/types';
import { getGmailMessage } from '../actions/asyncActionCreators';
import { loadToken } from '../utils/authUtils';

const gmailMiddleware = (store) => (next) => async (action) => {

    next(action);
    const dispatch = store.dispatch;
    const token = loadToken();


    switch(action.type) {
        case types.LOAD_MESSAGES_FULFILLED:
            action.payload.data.messages.map(({ id, threadId }) => {
                dispatch(getGmailMessage( id, token ));
            })
            break;
        case types.SEND_EMAIL_TO_GOOGLE_REJECTED:
        case types.LOAD_LABELS_REJECTED:
        case types.LOAD_MESSAGES_REJECTED:
            const statusCode = action.payload.response.status || 500;
            
            if (statusCode === 401 && !(action.meta && action.meta.try)) {
                window.localStorage.removeItem('token');
                const options = {
                    interactive: false
                };

                // Try request
                chrome.identity.getAuthToken(options, function(token) {
                    dispatch({
                        type: action.type.replace('_REJECTED', ''),
                        payload: axios({
                            url: action.meta.url,
                            method: 'GET',
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }),
                        meta: {
                            try: true
                        }
                    });
                    window.localStorage.setItem('token', token);
                });
               
            }
            break;

        case types.LOAD_MESSAGES:
            const isReset = action.isReset;

            if (isReset) {
                dispatch({ type: types.RESET_GMAIL_MESSAGES });
            }


            break;
        default:
            break;
    };
};


export default gmailMiddleware