import AddStudentUI from './AddStudentUI';
import { connect } from 'react-redux';
import { getValue, saveStudents, loadLastStudent, navigate } from '../../actions';


const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getValue: (data) => dispatch(getValue(data)),
        saveStudents: (data) => dispatch(saveStudents(data)),
        loadLastStudent: (student) => dispatch(loadLastStudent(student)),
        navigate: (data) => dispatch(navigate(data)),

    };
};

const AddStudent = connect(
    mapStateToProps, 
    mapDispatchToProps
)(AddStudentUI);
export default AddStudent;