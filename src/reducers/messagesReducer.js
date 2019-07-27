import * as types from '../actions/types';

const dummyMessages = {
    
};

const initialState = [];

function messagesReducer(state = initialState, action) {
    const newState = [ ...state ];
    switch(action.type) {
        case types.LOAD_MESSAGES_FULFILLED:
            return [ ...newState, ...action.payload.data.messages];

        case types.ADD_MESSAGE:
                return [ ...newState, action.payload];

        case types.GET_GMAIL_MESSAGE_FULFILLED:
            const newMessages = newState.map((message) => {
                if (message.id === action.payload.data.id) {
                    return {
                        ...action.payload.data
                    }
                }
                return {
                    ...message
                }

            });
            return [...newMessages];
        default:
            return state;
    };
}  


export default messagesReducer;