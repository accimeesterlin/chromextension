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

const templateReducer = (state = initialState, action) => {
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

        case types.UPDATE_TEMPLATE_INPUT:
            // newState.templateInputs[key] = value;
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