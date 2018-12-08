export function addStudents(student) {
    const students = this.state.students;

    this.setState({
        students: [...students, student]
    });
};