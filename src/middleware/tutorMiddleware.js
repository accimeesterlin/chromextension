/*eslint-disable */
import * as types from '../actions/types';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import selectn from 'selectn';
import { getTutorGmailProfile } from '../actions/asyncActionCreators';
import { loadToken } from '../utils/authUtils';

const loadTemplates = () => {
    const templates = JSON.parse(localStorage.getItem('templates'));

    if (Array.isArray(templates)) {
        const listTemplates = templates.map((template) => {
            const templateEditor =  EditorState.createWithContent(
                convertFromRaw(template.templateEditor)
            );

            return {
                ...template,
                templateEditor
            };
        });

        return listTemplates;
    }

    return [];
}

const saveTemplates = (templates) => {
    localStorage.setItem('templates', JSON.stringify(templates));
};

const tutorMiddleware = (store) => (next) => async (action) => {
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
            const convertListTemplates = listTemplates.map((template) => {
                return {
                    ...template,
                    templateEditor: convertToRaw(template.templateEditor.getCurrentContent())
                }
            });
            saveTemplates(convertListTemplates);
            break;
        default:
            break;
    };
};


export default tutorMiddleware