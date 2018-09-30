import { connect } from 'react-redux';
import DeleteStudentUI from './DeleteStudentUI';
import { deleteStudent, navigate } from '../../actions';


const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteStudent: (email) => dispatch(deleteStudent(email)),
        navigate: (data) => dispatch(navigate(data)),

    };
};

const DeleteStudent = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteStudentUI);

export default DeleteStudent;