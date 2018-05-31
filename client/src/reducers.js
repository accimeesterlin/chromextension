const initialState = {
    username: 'accime',
    url: '/home',
    users: []
};

const reducers = (state = initialState, action) => {

    switch (action.type) {
        case 'NAVIGATION':
            return {
                ...state,
                url: action.url
            };
        case 'FETCH_STUDENTS_FULFILLED':
            return {
                ...state,
                users: action.payload.data
            };
        case 'GET_VALUE':
            return {
                ...state,
                ...action.data
            };

        default:
            return state;
    }
};

export default reducers;