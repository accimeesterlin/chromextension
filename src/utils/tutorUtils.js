export function generateSheetUrl(url, rosterName) {
    const sheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rosterName}?`;
    const params = `key=AIzaSyCqo2Ufn8KUXDBUxHUc7MBXoXv8wdBOfK0`;
    const endpointUrl = `${endpoint}${params}`;
    return endpointUrl;
}


// Key to identify sessions or tutorings
const sessionNames = [
    'session',
    'tutoring',
    'tutorial',
    'student'
];


/*

    Check the following for tutorings
        - Sumary
        - Description
        - Location
    If one of them includes one of the above word in the array, then Bingo!!!
*/
export function isTutoringSession(event) {
    const summary = event.summary.toLowerCase();
    const description = event.description ? event.description.toLowerCase() : '';
    const location = event.location ? event.location : '';

    let isTutoring = false;

    for (let i = 0; i < sessionNames.length; i++) {
        const key = sessionNames[i];
        if (summary.includes(key) || description.includes(key) || location.includes(key)) {
            isTutoring = true;
            break;
        }   
    }

    return isTutoring;
}   