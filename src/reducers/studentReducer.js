import * as types from '../actions/types';
const initialState = [];

function studentReducer(state = initialState, action) {
    const newState = [ ...state ];
    switch(action.type) {
        case types.ADD_STUDENT:
            return [ ...newState, action.payload];

        case types.REMOVE_STUDENT:
            const studentEmail = action.payload;
            const students = newState.filter(({ email }) => email !== studentEmail);
            return [...students]
        default:
            return state;
    };
}  


export default studentReducer;