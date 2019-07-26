import * as types from '../actions/types';

const dummyTemplates = {
    templateContent: 'I am happy to be here',
    templateSubject: 'Confirmation Email',
    templateName: 'Email Confirmation',
    templateEditor: 'What is going on guys or folks?'
};

const initialState = [];

function templateReducer(state = initialState, action) {
    const newState = [ ...state ];
    switch(action.type) {
        case types.ADD_TEMPLATE:
            return [ ...newState, action.payload];

        default:
            return state;
    };
}  


export default templateReducer;