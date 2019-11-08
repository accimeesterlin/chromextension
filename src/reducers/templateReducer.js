import * as types from '../actions/types';
import { EditorState } from "draft-js";


const initialState = {
    listTemplates:  [
        {
            templateId: 3,
            templateContent: 'Sime test',
            templateSubject: 'happpy',
            templateName: 'moving forward',
            templateEditor: EditorState.createEmpty() || {}
        }
    ],
    currentTemplate: {
        templateId: 3,
        templateContent: '',
        templateSubject: '',
        templateName: '',
        templateEditor: EditorState.createEmpty() || {}
    }
}

const deleteTemplateByIndex = (templates, index) => {
    if (!templates.length) return [];
    const filteredTemplates = templates.filter((template, key) => key !== index);
    return filteredTemplates;
};



const templateReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.ADD_TEMPLATE:
            return {
                ...state,
                listTemplates: [
                    ...newState.listTemplates,
                    action.payload
                ]
            };

        case types.DELETE_TEMPLATE:
            const templates = newState.listTemplates;
            const templateIndex = action.payload;
            const filteredTemplates = deleteTemplateByIndex(templates, templateIndex);

            return {
                ...state,
                listTemplates: filteredTemplates
            }

        case types.UPDATE_CURRENT_TEMPLATE:
            newState.currentTemplate = action.payload;
            return {
                ...newState
            }

        case types.UPDATE_SELECTED_TEMPLATE:
            const index = action.payload.templateIndex;
            const template = action.payload.template;
            newState.listTemplates[index] = template;
            return {
                ...newState,
            };

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