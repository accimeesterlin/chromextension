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
    },
    templateInputs: {
        templateId: '',
        templateContent: '',
        templateSubject: '',
        templateName: '',
        templateEditor: EditorState.createEmpty() || {},
        includeSubject: false
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

        case types.LOAD_DATA:
            newState.listTemplates = action.templates;
            return {
                ...newState
            }

        case types.UPDATE_TEMPLATE_INPUT:
            return {
                ...newState,
                templateInputs: {
                    ...newState.templateInputs,
                    ...action.payload
                }
            };

        case types.UPDATE_TEMPLATE_EDITOR_INPUT:
            return {
                ...newState,
                templateInputs: {
                    ...newState.templateInputs,
                    templateEditor: action.payload
                }

            }
        
        case types.RESET_TEMPLATE_INPUTS:
            return {
                ...newState,
                templateInputs: {
                    templateId: '',
                    templateContent: '',
                    templateSubject: '',
                    templateName: '',
                    templateEditor: EditorState.createEmpty() || {},
                    includeSubject: false
                }
            }

        default:
            return state;
    };
}  


export default templateReducer;