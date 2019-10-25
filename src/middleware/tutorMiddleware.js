/*eslint-disable */
import * as types from '../actions/types';
import { convertFromRaw, convertToRaw } from 'draft-js';

import selectn from 'selectn';
import { getTutorGmailProfile } from '../actions/asyncActionCreators';
import { loadToken } from '../utils/authUtils';

const loadTemplates = () => {
    const templates = JSON.parse(localStorage.getItem('templates'));

    if (Array.isArray(templates)) {
        const listTemplates = templates.map((template) => {
            console.log('Template From Local Storage: ', template);
            return {
                ...template
            };
        });
        return listTemplates;
    }

    return [];
}

const saveTemplates = (templates) => {
    localStorage.setItem('templates', JSON.stringify(templates));
};

const gmailMiddleware = (store) => (next) => async (action) => {

    next(action);
    const dispatch = store.dispatch;
    const state = store.getState();


    switch(action.type) {
        case types.INIT_APP:
            const token = loadToken() || '';
            dispatch(getTutorGmailProfile(token));

            // Getting templates from storage
            const templates = loadTemplates();
            if (templates.length > 0) {
                dispatch({
                    type: types.LOAD_DATA,
                    isAppInitialized: true,
                    templates
                });
            }
            break;

        case types.ADD_TEMPLATE:
            const listTemplates = selectn('templates.listTemplates', state);
            saveTemplates(listTemplates);
            break;
        default:
            break;
    };
};


export default gmailMiddleware