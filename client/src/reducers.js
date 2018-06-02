import syncStorage from './utils/syncStorage';

const initialState = {
    url: '/home',
    users: [],
    students: [],
    username: '',
    name: '',
    code: '',
    email: '',
    tutor_name: '',
    google_sheet_url: '',
    notification: false,
    notificationMessage: ''
};


const reducers = (state = initialState, action) => {

    switch (action.type) {
        case 'NAVIGATION':
            return {
                ...state,
                notification: false,
                notificationMessage: '',
                url: action.url
            };

        case 'GET_VALUE':
            return {
                ...state,
                ...action.data,
                notification: false,
                notificationMessage: ''
            };

        case 'SAVE_TUTOR_INFO':
            const {
                tutor_name,
                google_sheet_url
            } = action.data;
            chrome.storage.sync.set({
                tutor_name,
                google_sheet_url
            }, function () {
                console.log('Tutor/Sheet has successfully been saved!');
            });

            return {
                ...state,
                ...action.data,
                notification: true,
                notificationMessage: 'Your info has successfully been saved!'
            };

        case 'DELETE_STUDENT':
            const {
                students
            } = state;

            const deleteCondition = students.filter((student, index) => student.email !== action.email);
            syncStorage.syncLocalStorage(deleteCondition);
            return {
                ...state,
                students: deleteCondition,
            };
        case 'SAVE_STUDENTS':
            syncStorage.syncLocalStorage([...state.students, action.data]);

            return {
                ...state,
                username: '',
                name: '',
                code: '',
                email: '',
                students: [...state.students, action.data],
                notification: true,
                notificationMessage: `We have successfully ${action.data.name} into your student list!`
            };
        default:
            return state;
    }
};

export default reducers;