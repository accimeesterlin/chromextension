/*eslint-disable */

// Constants
const TUTOR_NAME_WRAPPER = '.freebirdFormviewerViewItemsTextItemWrapper';
// const RADIO_INPUT = 'quantumWizTogglePaperradioEl'; // aria-checked
const PLACE_HOLDER = 'quantumWizTextinputPaperinputPlaceholder';
const TEXTAREA_PLACEHOLDER = 'quantumWizTextinputPapertextareaPlaceholder';
const STUDENT_NAME = 'input[name="entry.1262798942"]';
const STUDENT_CODE = 'input[name="entry.1626809215"]';
const STUDENT_EMAIL = 'input[name="entry.1509111758"]';
const STUDENT_USERNAME = 'input[name="entry.2097580399"]';
const TODAY_DAY = 'input[name="entry.401287639_day"]';
const TODAY_MONTH = 'input[name="entry.401287639_month"]';
const TODAY_YEAR = 'input[name="entry.401287639_year"]';
const DATE_INPUT = 'input[type="date"]';
const DATE_DIV_PARENT = '.freebirdThemedInput.freebirdFormviewerViewItemsDateDateInput';


const removePlaceholder = () => {
    $(`.${PLACE_HOLDER}, .${TEXTAREA_PLACEHOLDER}`).each(function () {
        $(this).html('');
    });
};

const autoFillStudentInput = (student) => {
    const {
        studentCode,
        name,
        githubUsername,
        email
    } = student;
    $(STUDENT_CODE).val(studentCode); // code
    $(STUDENT_NAME).val(name); // Name
    $(STUDENT_USERNAME).val(githubUsername); // username
    $(STUDENT_EMAIL).val(email); // email

    removePlaceholder();
};

const fillInTutorName = () => {
    const tutorName = localStorage.getItem('tutorName');
    $(`${TUTOR_NAME_WRAPPER} input[type="text"]`).val(tutorName);
};

const fillInSessionDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const dayFormat = moment().format('YYYY-MM-DD');

    $(DATE_DIV_PARENT).addClass('hasValue');
    $(DATE_INPUT).val(dayFormat).attr('data-initial-value', dayFormat);
    $(TODAY_DAY).val(day);
    $(TODAY_MONTH).val(month);
    $(TODAY_YEAR).val(year);
};

// TODO
// Currently not working
const fillInNotTA = () => {
    $('div[data-item-id="124907758"] .freebirdFormviewerViewItemsRadioControl').addClass('isCheckedNext isChecked').attr({
        'tab-index': 0,
        'aria-checked': true,
        'data-value': 'Yes'
    });
    $('input[name="entry.790082012"]').val('Yes');
};

const fillInComments = () => {
    $('textarea').val('N/A');
};

const validateSecondPage = () => {
    $('.freebirdFormviewerViewItemsItemItemTitle.freebirdCustomFont').each(function () {
        const value = $(this).html().trim();

        if (value.includes("Tutor's Name")) {
            fillInTutorName();
            fillInSessionDate();
            fillInComments();
            // fillInNotTA();

            removePlaceholder();
        }
    })
};

validateSecondPage();


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const {
        student,
        tutorName
    } = request;

    localStorage.setItem('tutorName', tutorName);
    autoFillStudentInput(student);
    sendResponse({
        farewell: 'goodbye'
    })
});

