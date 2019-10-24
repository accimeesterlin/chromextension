import axios from 'axios';
import * as types from '../actions/types';

const endpoint = 'https://www.googleapis.com/gmail/v1/users/me';

export const getTutorGmailProfile = (token) => {
    const url = `${endpoint}/profile`;
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
