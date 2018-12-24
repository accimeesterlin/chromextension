import _ from 'lodash';

export function addStudents(student) {
    const students = this.state.students;
    const removeDuplicateStudents = _.uniqBy([...students, student], 'email');
    const sortStudentsByName = _.sortBy(removeDuplicateStudents, ['name'], ['acs']);

    this.setState({
        students:  sortStudentsByName 
    });
};



export function deleteStudent(student) {
    const students = this.state.students.filter((el) => el.email !== student.email);

    this.setState({
        students
    });
}


export function saveTutorInfo(info) {

    this.setState({
        ...info
    });
}