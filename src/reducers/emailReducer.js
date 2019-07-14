const initialState = {};



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