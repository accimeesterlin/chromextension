// const log = console.log;

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
        code,
        name,
        username,
        email
    } = student;
    $(STUDENT_CODE).val(code); // code
    $(STUDENT_NAME).val(name); // Name
    $(STUDENT_USERNAME).val(username); // username
    $(STUDENT_EMAIL).val(email); // email

    removePlaceholder();
};

const fillInTutorName = () => {
    chrome.storage.sync.get('tutor_name', function (data) {
        const name = data.tutor_name;
        $(`${TUTOR_NAME_WRAPPER} input[type="text"]`).val(name);
    });
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

const grabSelectedStudent = (students, value) => {
    let current_student = {};
    students.map((el, index) => {
        if (el.email === value) {
            current_student = el;

        }
        return true;
    });
    return current_student;
};


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const students = request.students;
    const value = request.value;
    let current_student = grabSelectedStudent(students, value);
    autoFillStudentInput(current_student);
    sendResponse({
        farewell: 'goodbye'
    })
});

console.log('Testing and Testing');

const activeURL = window.location.href;

if (activeURL === 'https://workforcenow.adp.com/portal/theme') {
    var timer = setInterval(function () {
        console.log('Checking Scripts: ');
        const element = $('#divActivities table tbody tr');

        if (element) {
            grabClocks();
        }
    }, 111);
}

function grabClocks() {
    console.log('Element Found!');
    let all_date = [];
    $('#divActivities table tbody tr').each(function () {
        var clocks = [];
        $(this).find('td').each(function (index) {
            let obj = {};
            const result = $(this).html();
            obj[index] = result[index];
            clocks.push(result);
            clearInterval(timer);
        });

        console.log('Clocks: ', clocks);
        const main = clocks.reduce((accu, curr, arr) => {
            // TODO
            const key = arr[0];
            accu[key] = arr;
            return accu;
        }, {});

        console.log('Main: ', main);
        console.log('Clocks: ', clocks);
    });
};