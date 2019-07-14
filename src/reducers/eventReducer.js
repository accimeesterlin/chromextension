import * as types from '../actions/types';
const initialState = [];

function eventReducer(state = initialState, action) {
    const newState = [ ...state ];

    switch(action.type) {
        case types.ADD_EVENT:
            return [ ...newState, action.payload];

        case types.LOAD_EVENTS:
            return [...newState, ...action.payload];

        default:
            return state;
    };
}  


export default eventReducer;