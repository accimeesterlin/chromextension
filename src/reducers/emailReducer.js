import * as types from '../actions/types';

export const dummyMessages = [
    { 
        snippet: 'Let me see what the heck happened',
        payload: {
            headers: {
                name: 'Subject',
                value: 'What is going happy to be here'
            }
        }
    },

    { 
        snippet: 'Hello World',
        payload: {
            headers: {
                name: 'Subject',
                value: 'Let us see what happen'
            }
        }
    },

    { 
        snippet: 'Go home',
        payload: {
            headers: {
                name: 'Subject',
                value: 'What is going on'
            }
        }
    },
]

const initialState = {
    messages: [],
    receiverDetails: {
        email: '',
        subject: '',
        msg: ''
    }
};



const emailReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch(action.type) {
        case types.UPDATE_RECEIVER_DETAILS:
            return {
                ...newState,
                receiverDetails: {
                    ...newState.receiverDetails,
                    ...action.payload
                }
            };

        case types.UPDATE_RECEIVER_MSG:
            newState.receiverDetails.msg = action.payload;
            return {
                ...newState
            }

        default:
            return state;
    };
}  


export default emailReducer;