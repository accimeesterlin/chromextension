import * as types from '../actions/types';
const initialState = {
    open: false,
    message: '',
    type: ''
};

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SEND_NOTIFICATION:
            return {
                open: true,
                message: action.payload.message,
                type: action.payload.notificationType
            }
        case types.RESET_NOTIFICATION:
            return {
                open: false,
                message: '',
                type: ''
            }
        default:
            return state;
    };
}  


export default notificationReducer;