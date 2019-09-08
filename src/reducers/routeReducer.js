import * as types from '../actions/types';

const initialState = {
    currentRoute: '/dashboard'
};

const routeReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.CURRENT_ROUTE:
            return {
                ...state,
                currentRoute: action.payload
            }

        default:
            return state;
    };
}  


export default routeReducer;