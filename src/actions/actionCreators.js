import * as types from './types';

// Manage Students
export const addStudent = (student) => ({
    type: types.ADD_STUDENT,
    payload: student
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

// Manage Messages
export const loadMessages = (messages) => ({
    type: types.LOAD_MESSAGES,
    payload: messages
});