import * as types from '../actions/types';

const dummyTemplates = {
    templateContent: 'I am happy to be here',
    templateSubject: 'Confirmation Email',
    templateName: 'Mohit Negi has subscribed to you on YouTube 1 subscriber 1 video Channels who subscribe to you will be notified when you upload new videos or respond to others&#39; videos (by favoriting, commenting,',
    templateEditor: 'What is going on guys or folks?'
};

const initialState = [dummyTemplates];

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