export function addStudents(student) {
    const students = this.state.students;

    this.setState({
        students: [...students, student]
    });
};



export function deleteStudent(student) {
    const students = this.state.students.filter((el) => {
        if (el.email !== student.email) {
            return el;
        }
    });

    this.setState({
        students
    });
}


export function saveTutorInfo(info) {

    this.setState({
        ...info
    });
}