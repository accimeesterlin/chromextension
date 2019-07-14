import * as types from './types';

// Students
export function addStudent(student) {
    return {
        type: types.ADD_STUDENT,
        payload: student
    };
}

export function removeStudent(studentEmail) {
    return {
        type: types.REMOVE_STUDENT,
        payload: studentEmail
    };
}

// TODO
export function updateStudent() {

}

// Tutor
export function saveTutorName(name) {
    return {
        type: types.TUTOR_NAME,
        payload: name
    };
}

export function saveTutorRoster(roster) {
    return {
        type: types.TUTOR_ROSTER_NAME,
        payload: roster
    };
}

export function saveTutorGoogleSheetUrl(googleSheetUrl) {
    return {
        type: types.TUTOR_GOOGLE_SHEET_URL,
        payload: googleSheetUrl
    };
}

// Events
export function addEvent(event) {
    return {
        type: types.ADD_EVENT,
        payload: event
    };
}

export function loadEvents(events) {
    return {
        type: types.LOAD_EVENTS,
        payload: events
    };
}