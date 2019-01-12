export function generateSheetUrl(url, rosterName) {
    const sheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
    const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rosterName}?`;
    const params = `key=AIzaSyCqo2Ufn8KUXDBUxHUc7MBXoXv8wdBOfK0`;
    const endpointUrl = `${endpoint}${params}`;
    return endpointUrl;
}


export function isTutoringSession(event) {


    const name = event.summary.toLowerCase();

    return name.includes('session') ||
        name.includes('tutoring') ||
        name.includes('tutorial') ||
        name.includes('student');
}   