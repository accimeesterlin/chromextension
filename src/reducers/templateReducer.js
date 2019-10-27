import * as types from '../actions/types';
import { EditorState } from "draft-js";


const initialState = {
    listTemplates:  [],
    currentTemplate: {
        templateId: 3,
        templateContent: '',
        templateSubject: '',
        templateName: '',
        templateEditor: EditorState.createEmpty() || {}
    }
}

function templateReducer(state = initialState, action) {
    const newState = { ...state };
    switch(action.type) {
        case types.ADD_TEMPLATE:
            newState.listTemplates = [...newState.listTemplates, action.payload]
            return {
                ...newState
            };

        case types.UPDATE_CURRENT_TEMPLATE:
            newState.currentTemplate = action.payload;
            return {
                ...newState
            }

        case types.LOAD_DATA:
            newState.listTemplates = action.templates;
            return {
                ...newState
            }

        default:
            return state;
    };
}  


export default templateReducer;