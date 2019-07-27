import axios from 'axios';
import * as types from '../actions/types';


export const getGmailMessage = (messageId, token) => {
    return {
        type: types.GET_GMAIL_MESSAGE,
        payload: axios({
            url: `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};

export const loadMessages = (limit = 10, token) => {
    return {
        type: types.LOAD_MESSAGES,
        payload: axios({
            url: `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=${limit}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};


export const sendEmailToGoogle = (payload, token) => {
    return {
        type: types.SEND_EMAIL_TO_GOOGLE,
        payload: axios({
            url: `https://www.googleapis.com/gmail/v1/users/me/messages/send`,
            method: 'POST',
            data: payload,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
};
