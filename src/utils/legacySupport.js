/*eslint-disable */



export const getLegacyStudents = function (results) {
    if (results && results.students && results.students.length > 0) {
        const students = results.students;
        const self = this;
        students.map(function (student) {
            self.setState({
                students: [...self.state.students, {
                    name: student.name,
                    githubUsername: student.username,
                    email: student.email,
                    studentCode: student.code,
                }],
                isLegacyStudentComplete: true
            });
        });

        return;
    }

    this.seState({ isLegacyStudentComplete: true });
};

export const getLegacyTutorInfo = function (data) {
    if ((data && data.tutor_name) || data && data.google_sheet_url) {
        this.setState({
            tutorName: data.tutor_name || '',
            googleSheetUrl: data.google_sheet_url || '',
            isLegacyTutorComplete: true
        });

        return;
    }

    this.setState({ isLegacyTutorComplete: true });
};

export const clearLegacyStorage = function () {
    chrome.storage.sync.clear(function () {
        console.log('Old Storage clear!');
    })
}