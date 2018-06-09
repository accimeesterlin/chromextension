import axios from 'axios';
import {
    google_sheet_api_key
} from './keys';

export const getValue = (data) => {
    return {
        type: 'GET_VALUE',
        data
    };
};


export const deleteStudent = (email) => {
    return {
        type: 'DELETE_STUDENT',
        email
    };
};

export const navigate = (data) => {
    return {
        type: 'NAVIGATION',
        ...data
    }
};


export const saveTutorInfo = (data) => {
    return {
        type: 'SAVE_TUTOR_INFO',
        data
    }
};

export const resetStudents = () => {
    return {
        type: 'RESET_STUDENTS'
    };
};

export const saveGoogleSheetStudents = (list_students) => {
    return {
        type: 'SAVE_GOOGLE_SHEET_STUDENTS',
        list_students
    };
};

export const saveStudents = (data) => {
    return {
        type: 'SAVE_STUDENTS',
        data
    };
};


export const searchStudents = (students) => {
    return {
        type: 'SEARCH_STUDENTS',
        students
    };
};

export const loadLastStudent = (student) => {
    return {
        type: 'LOAD_STUDENT',
        student
    }
};

export const loadTutorInfo = (data) => {
    return {
        type: 'LOAD_TUTOR_INIT',
        data
    }
};

export const isColumnFiltered = (data) => {
    return {
        type: 'IS_COLUMN_FILTERED',
        data
    };
};
export const handleError = (error) => {
    return {
        type: 'HANDLE_ERROR',
        ...error
    };
};

export const fetchGoogleSheetStudent = (sheet_id) => {
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Roster?`;
    const params = `key=${google_sheet_api_key}`;

    return {
        type: "FETCH_GOOGLE_SHEET_STUDENT",
        payload: axios({
            url: endpoint + params,
            method: 'GET'
        })
    };
};