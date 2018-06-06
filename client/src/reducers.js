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
    notificationMessage: '',
    error: false,
    status: '',
    pending: '',
    errorMessage: '',
    isFiltered: false
};

const removeDuplicate = (students) => {
    if (students.length > 0) {
        var results = students.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.email === thing.email
            ))
        );
        return results;
    } else {
        return students;
    }

};

const reducers = (state = initialState, action) => {

    switch (action.type) {
        case 'NAVIGATION':
            return {
                ...state,
                notification: false,
                notificationMessage: '',
                url: action.url,
                error: false,
                errorMessage: ''
            };

        case 'GET_VALUE':
            return {
                ...state,
                ...action.data,
                notification: false,
                notificationMessage: '',
                errorMessage: '',
                error: false
            };

        case 'SAVE_GOOGLE_SHEET_STUDENTS':
            const all_students = state.students.concat(action.list_students);
            const list_students = removeDuplicate(all_students);
            syncStorage.syncLocalStorage(list_students);

            return {
                ...state,
                students: [...list_students],
                tutor_name: action.tutor_name,
                notification: true,
                notificationMessage: 'We have successfully imported all your students'
            };

        case 'SAVE_TUTOR_INFO':
            const {
                tutor_name
            } = action.data;
            try {
                chrome.storage.sync.set({
                    tutor_name
                }, function () {
                    console.log('Tutor/Sheet has successfully been saved!');
                });
            } catch (error) {
                // TODO
            }

            return {
                ...state,
                ...action.data,
                notification: true,
                error: false,
                google_sheet_url: '',
                notificationMessage: 'Your Tutor Name has successfully been saved!'
            };
        case 'FETCH_GOOGLE_SHEET_STUDENT_PENDING':
            return {
                ...state,
                notification: false,
                status: 'pending',
                notificationMessage: ''
            };

        case 'FETCH_GOOGLE_SHEET_STUDENT_FULFILLED':
            return {
                ...state,
                status: 'success',
                error: false,
                google_sheet_url: ''
            };

        case 'FETCH_GOOGLE_SHEET_STUDENT_REJECTED':
            return {
                ...state,
                error: true,
                status: 'rejected',
                errorMessage: action.payload.response.data.error.message || 'Error occurs'
            };

        case 'DELETE_STUDENT':
            const {
                students
            } = state;

            const deleteCondition = students.filter((student, index) => {
                return student.email !== action.email
            });

            syncStorage.syncLocalStorage(deleteCondition);
            return {
                ...state,
                students: deleteCondition,
            };

        case 'HANDLE_ERROR':
            return {
                ...state,
                error: action.error,
                errorMessage: action.errorMessage
            };

        case 'LOAD_STUDENT':
            return {
                ...state,
                ...action.student
            };

        case 'SAVE_STUDENTS':
            const filter_students = removeDuplicate(state.students);
            syncStorage.syncLocalStorage([...filter_students, action.data]);

            return {
                ...state,
                username: '',
                name: '',
                code: '',
                email: '',
                students: [...filter_students, action.data],
                notification: true,
                notificationMessage: `We have successfully ${action.data.name} into your student list!`
            };

        default:
            return state;
    }
};

export default reducers;