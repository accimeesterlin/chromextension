/*eslint-disable */
import axios from 'axios';
import * as types from '../actions/types';
import selectn from 'selectn';
import { loadToken } from '../utils/authUtils';
import { createEmailPayload } from '../utils/emailPayload';
import { getTutorGmailProfile } from '../actions/asyncActionCreators';
import { sendNotification, resetNotification } from '../actions/actionCreators';

const log = console.log;
const endpoint = 'https://www.googleapis.com/gmail/v1/users/me';

let retryEmailCount = 0;
let retryTutorProfile = 0;

export const sendEmailToGmail = async (state, token) => {
    const url = `${endpoint}/messages/send`;
    const payload = createEmailPayload(state);
    retryEmailCount += 1;

    let response;
    try {
        response = await axios({
            url,
            method: 'POST',
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        retryEmailCount = 0; // reset retry
        log('Email Response: ', emailResponse);
        log('Message has successfully sent!!!!!!');

    } catch (error) {
        // Retry strategy for sending the email
        if (error.statusCode && retryEmailCount <= 2) {
            generateAuthToken((token) => {
                sendEmailToGmail(state, token);
            });
        }
    }

    return response;
};


export const generateAuthToken = (cb) => {
    const options = {
        interactive: false
    };
    chrome.identity.getAuthToken(options, function(token) {
        cb(token);
        window.localStorage.setItem('token', token);
    });
};

const gmailMiddleware = (store) => (next) => async (action) => {

    next(action);
    const dispatch = store.dispatch;
    const state = store.getState();
    const token = loadToken();


    switch(action.type) {
        case types.REQUEST_TO_SEND_EMAIL:
            // Get token
            const emailResponse = await sendEmailToGmail(state, token);

            if (emailResponse.status === 200) {
                dispatch(
                    sendNotification('success', 'Email has been sent!!!')
                );
            } else {
                log('Email Response: ', emailResponse);
                dispatch(
                    sendNotification('error', 'Failed sending the email!!!')
                );
            }

            setTimeout(() => {
                dispatch(resetNotification());
            }, 1500);
            break;
        case types.GET_GMAIL_PROFILE_REJECTED:
            retryTutorProfile += 1;
            if (retryTutorProfile <= 2) {
                return generateAuthToken((token) => {
                    dispatch(getTutorGmailProfile(token));
                    window.localStorage.setItem('token', token);
                    retryTutorProfile = 0;
                });
            }
            break;
        default:
            break;
    };
};


export default gmailMiddleware