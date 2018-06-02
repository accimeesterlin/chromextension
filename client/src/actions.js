import axios from 'axios';

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




export const saveStudents = (data) => {
    return {
        type: 'SAVE_STUDENTS',
        data
    };
};