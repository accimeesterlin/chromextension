import * as types from './types';

export const initializeApp = () => {
    return {
        type: types.INIT_APP,
    }
}

// Manage Students
export const addStudent = (student) => ({
    type: types.ADD_STUDENT,
    payload: student
})

export const loadStudentFromGoogleSheet = (students) => ({
    type: types.LOAD_STUDENTS_FROM_GOOGLE_SHEETS,
    payload: students
})

export const removeStudent = (studentEmail) => ({
    type: types.REMOVE_STUDENT,
    payload: studentEmail
});

export const setCurrent = (currentRoute) => ({
    type: types.CURRENT_ROUTE,
    payload: currentRoute
});

// Manage Tutor Profile
export const saveTutorName = (name) => ({
    type: types.TUTOR_NAME,
    payload: name
});

export const saveTutorRoster = (roster) => ({
    type: types.TUTOR_ROSTER_NAME,
    payload: roster
});

export const saveTutorGoogleSheetUrl = (googleSheetUrl) => ({
    type: types.TUTOR_GOOGLE_SHEET_URL,
    payload: googleSheetUrl
});

// Manage Events
export const addEvent = (event) => ({
    type: types.ADD_EVENT,
    payload: event
});

export const loadEvents = (events) => ({
    type: types.LOAD_EVENTS,
    payload: events
});


// Manage Templates
export const addTemplate = (template) => ({
    type: types.ADD_TEMPLATE,
    payload: template
});

export const deleteTemplate = (index) => ({
    type: types.DELETE_TEMPLATE,
    payload: index
});

export const updateSelectedTemplate = (template, templateIndex) => {
    return {
        type: types.UPDATE_SELECTED_TEMPLATE,
        payload: {
            template,
            templateIndex
        }
    }
};



export const updateCurrentTemplate = (currentTemplate) => {

    return {
        type: types.UPDATE_CURRENT_TEMPLATE,
        payload: currentTemplate
    };
};

export const editTemplate = (template) => {

    return {
        type: types.EDIT_TEMPLATE,
        payload: template
    };
};



// Email
export const updateReceiverSubject = (subject) => {

    return {
        type: types.UPDATE_RECEIVER_SUBJECT,
        payload: subject
    };
};

export const updateReceiverEmail = (email) => {

    return {
        type: types.UPDATE_RECEIVER_EMAIL,
        payload: email
    };
};

export const updateReceiverMsg = (msg) => {

    return {
        type: types.UPDATE_RECEIVER_MSG,
        payload: msg
    };
};

export const updateReceiverDetails = (info) => {
    return {
        type: types.UPDATE_RECEIVER_DETAILS,
        payload: info
    };
};

export const requestToSendEmail = () => {
    return {
        type: types.REQUEST_TO_SEND_EMAIL
    }
}


export const sendNotification = (notificationType, message) => {
    return {
        type: types.SEND_NOTIFICATION,
        payload: {
            message,
            notificationType
        }
    }
}

export const resetNotification = () => {
    return {
        type: types.RESET_NOTIFICATION,
    }
}
