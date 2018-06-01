import syncStorage from './utils/syncStorage';

const initialState = {
    url: '/home',
    users: [],
    students: [],
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

        case 'DELETE_STUDENT':
            const {
                students
            } = state;

            const deleteCondition = students.filter((student, index) => student.email !== action.email);
            syncStorage.syncLocalStorage(deleteCondition);
            return {
                ...state,
                students: deleteCondition
            };
        case 'SAVE_STUDENTS':
            syncStorage.syncLocalStorage([...state.students, action.data]);

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