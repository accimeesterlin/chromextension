const dummyMessages = [
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
    messages: []
};



function emailReducer(state = initialState, action) {
    switch(action.type) {
        case 'INCREMENT':
            // TODO
            // Handle further logic here
            return {
                ...state,
            };

        default:
            return state;
    };
}  


export default emailReducer;