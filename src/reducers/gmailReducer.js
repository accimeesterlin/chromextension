import * as types from '../actions/types';

const dummyMessages = [
    { 
        snippet: 'Let me see what the heck happened',
        payload: {
            headers: [
                {
                    name: 'Subject',
                    value: 'What is going happy to be here'
                }
            ]
        }
    },

    { 
        snippet: 'Hello World',
        payload: {
            headers: [
                {
                    name: 'Subject',
                    value: 'Let us see what happen'
                }
            ]
        }
    },

    { 
        snippet: 'Go home',
        payload: {
            headers: [
                {
                    name: 'Subject',
                    value: 'What is going on'
                }
            ]
        }
    },
]


const initialState = {
    nextPageToken: null,
    messages: [],
    resultSizeEstimate: 0,
    labels: [
        { name: 'INBOX', id: 1 },
        { name: 'IMPORTANT', id: 2 },
    ]
};

function gmailReducer(state = initialState, action) {
    const newState = { ...state };
    switch(action.type) {
        case types.LOAD_MESSAGES_FULFILLED:
            if (action.payload.data.resultSizeEstimate > 0) {
                if (action.meta.isReset) {
                    return {
                        ...newState,
                        nextPageToken: action.payload.data.nextPageToken,
                        resultSizeEstimate: action.payload.data.resultSizeEstimate,
                        messages: [...action.payload.data.messages] // reset messages
                    };
                }
                return {
                    ...newState,
                    nextPageToken: action.payload.data.nextPageToken,
                    resultSizeEstimate: action.payload.data.resultSizeEstimate,
                    messages: [
                        ...newState.messages,
                        ...action.payload.data.messages
                    ]
                };
            }
            
            return {
                ...newState
            };

        case types.ADD_MESSAGE:
                return [ ...newState, action.payload];
        
        case types.RESET_GMAIL_MESSAGES:
            return {
                ...newState,
                messages: []
            }

        case types.GET_GMAIL_MESSAGE_FULFILLED:
            const newMessages = newState.messages.map((message) => {
                if (message.id === action.payload.data.id) {
                    return {
                        ...action.payload.data
                    }
                }
                return {
                    ...message
                }

            });
            return {
                ...newState,
                messages: [...newMessages]
            };

        case types.LOAD_LABELS_FULFILLED:
            return {
                ...newState,
                ...action.payload.data
            }
        default:
            return state;
    };
}  


export default gmailReducer;