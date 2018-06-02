const log = console.log;
log('Hello World');




// Constants
const TUTOR_NAME_WRAPPER = '.freebirdFormviewerViewItemsTextItemWrapper';
const RADIO_INPUT = 'quantumWizTogglePaperradioEl'; // aria-checked
const PLACE_HOLDER = 'quantumWizTextinputPaperinputPlaceholder';
const TEXTAREA_PLACEHOLDER = 'quantumWizTextinputPapertextareaPlaceholder';


const removePlaceholder = () => {
    $(`.${PLACE_HOLDER}, .${TEXTAREA_PLACEHOLDER}`).each(function () {
        console.log('Remove Placeholder');
        $(this).html('');
    });
};



const getStudentInput = (student) => {
    const inputs = document.querySelectorAll('input[type="text"]');
    autoFillStudentInput(inputs, student);
};


const autoFillStudentInput = (inputs, student) => {
    const studentClassCode = inputs[0];
    const studentName = inputs[1];
    const studentEmail = inputs[2];
    const studentGithubUsername = inputs[3];

    studentClassCode.value = student.code;
    studentName.value = student.name;
    studentEmail.value = student.email;
    studentGithubUsername.value = student.username;

    removePlaceholder();
};

const fillInTutorName = () => {
    $(`${TUTOR_NAME_WRAPPER} input[type="text"]`).val('Esterling Accime');
};

const fillInSessionDate = () => {
    var today = moment().format('YYYY-MM-DD');
    $('input[type="date"]').val(today);
};

const fillInComments = () => {
    $('textarea').val('N/A');
};



const validateSecondPage = () => {
    console.log('Validate Function: ')
    $('.freebirdFormviewerViewItemsItemItemTitle.freebirdCustomFont').each(function () {
        console.log('Looping');
        const value = $(this).html().trim();

        if (value.includes("Tutor's Name")) {
            console.log('On the second page');
            fillInTutorName();
            fillInSessionDate();
            fillInComments();

            removePlaceholder();

        }
    })
};

validateSecondPage();

const grabSelectedStudent = (students, value) => {
    let current_student = {};
    students.map((el, index) => {
        log('El: ', el);
        if (el.email === value) {
            log('Conditon');
            current_student = el;

        }
        return true;
    });

    return current_student;
};


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    log('Request: ', request);
    const students = request.students;
    const value = request.value;
    log('Students: ', students);
    let current_student = grabSelectedStudent(students, value);
    getStudentInput(current_student);
    sendResponse({
        farewell: 'goodbye'
    })

});