import axios from 'axios';
import * as types from '../actions/types';


export const getGmailMessage = (messageId, token) => {
    const url = `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`;
    return {
        type: types.GET_GMAIL_MESSAGE,
        payload: axios({
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        meta: {
            url
        }
    }
};

export const getTutorGmailProfile = (token) => {
    const url = `https://www.googleapis.com/gmail/v1/users/me/profile`;
    return {
        type: types.GET_GMAIL_PROFILE,
        payload: axios({
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        meta: {
            url
        }
    };
};

export const loadMessages = (token, nextPageToken, labels, query, shouldEmptyMessages) => {
    let url = `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10`;

    if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`
    }

    if (labels) {
        url += `&labelIds=${labels}`;
    }

    if (query) {
        url += `&q=${query}`;

    }

    return {
        type: types.LOAD_MESSAGES,
        payload: axios({
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        meta: {
            isReset: shouldEmptyMessages,
            url
        }
    }
};

export const loadLabels = (token) => {
    const url = 'https://www.googleapis.com/gmail/v1/users/me/labels';
    return {
        type: types.LOAD_LABELS,
        payload: axios({
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        meta: {
            url
        }
    };
}

export const sendEmailToGoogle = (data, token) => {
    const url = 'https://www.googleapis.com/gmail/v1/users/me/messages/send';
    const method = 'POST';
    return {
        type: types.SEND_EMAIL_TO_GOOGLE,
        payload: axios({
            url,
            method,
            data,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }),
        meta: {
            url,
            method,
            data
        }
    }
};
