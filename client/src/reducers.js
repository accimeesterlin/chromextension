const initialState = {
    url: '/add',
    users: [],
    students: [{
        name: 'Please select a student name',
        email: ''
    }],
    username: '',
    name: '',
    code: '',
    email: ''
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
        case 'SAVE_STUDENTS':
            return {
                ...state,
                username: '',
                name: '',
                code: '',
                email: '',
                students: [...state.students, action.data]
            };
        default:
            return state;
    }
};

export default reducers;