import * as types from '../actions/types';

const initialState = {
    nextPageToken: null,
    messages: [],
    resultSizeEstimate: 0,
    labels: [
        { name: 'INBOX', id: 1 },
        { name: 'IMPORTANT', id: 2 }
    ]
};

function gmailReducer(state = initialState, action) {
    const newState = { ...state };
    switch(action.type) {
        case types.ADD_MESSAGE:
                return [ ...newState, action.payload];
        
        default:
            return state;
    };
}  


export default gmailReducer;