const log = console.log;
log('Hello World');
const autoPrefill = (student) => {

    // TODO
    // Ready to inject scripts into it
    console.log('It definitely works: ', student);

    const inputs = document.querySelectorAll('input[type="text"]');

    const studentClassCode = inputs[0];
    const studentName = inputs[1];
    const studentEmail = inputs[2];
    const studentGithubUsername = inputs[3];

    studentClassCode.value = student.code;
    studentName.value = student.name;
    studentEmail.value = student.email;
    studentGithubUsername.value = student.username;
};


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    log('Request: ', request);
    const students = request.students;
    const value = request.value;

    log('Students: ', students);

    let current_student = {};
    students.map((el, index) => {
        log('El: ', el);
        if (el.email === value) {
            log('Conditon');
            current_student = el;

        }
        return true;
    });

    autoPrefill(current_student);

    sendResponse({
        farewell: 'goodbye'
    })

});