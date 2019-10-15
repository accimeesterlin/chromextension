import * as types from '../actions/types';

const dummyTemplates = [
    {
        templateId: 0,
        templateContent: 'I am happy to be here',
        templateSubject: 'Confirmation Email',
        templateName: 'Confirmation email',
        templateEditor: 'What is going on guys or folks?'
    },
    {
        templateId: 1,
        templateContent: 'I am happy to be here',
        templateSubject: 'Welcome emails',
        templateName: 'Welcome email',
        templateEditor: 'What is going on guys or folks?'
    }
];

const initialState = {
    listTemplates: dummyTemplates || [],
    currentTemplate: {
        templateId: 3,
        templateContent: '',
        templateSubject: '',
        templateName: '',
        templateEditor: '<p>I am happy to be here</p>'
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

        default:
            return state;
    };
}  


export default templateReducer;