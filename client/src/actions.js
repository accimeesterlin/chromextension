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


export const fetchGoogleSheetStudent = (sheet_id) => {
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheet_id}/values/Sheet1?`;
    const params = `key=AIzaSyCqo2Ufn8KUXDBUxHUc7MBXoXv8wdBOfK0`;

    return {
        type: "FETCH_GOOGLE_SHEET_STUDENT",
        payload: axios({
            url: endpoint + params,
            method: 'GET'
        })
    };
};