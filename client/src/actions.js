import axios from 'axios';

export const getValue = (data) => {
    return {
        type: 'GET_VALUE',
        data
    };
};


export const navigate = (data) => {
    return {
        type: 'NAVIGATION',
        ...data
    }
};

export const fetchStudents = () => {
    return {
        type: "FETCH_STUDENTS",
        payload: axios({
            url: 'https://jsonplaceholder.typicode.com/users',
            method: 'GET'
        })
    }
};


export const saveStudents = (data) => {
    return {
        type: 'SAVE_STUDENTS',
        data
    };
};