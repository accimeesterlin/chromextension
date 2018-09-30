import { connect } from 'react-redux';
import HomeUI from './HomeUI';
import {
    saveTutorInfo,
    fetchGoogleSheetStudent,
    saveGoogleSheetStudents,
    loadTutorInfo,
    searchStudents,
    navigate
} from '../../actions';




const mapDispatchToProps = (dispatch) => {
    return {
        saveTutorInfo: (data) => dispatch(saveTutorInfo(data)),
        loadTutorInfo: (tutor) => dispatch(loadTutorInfo(tutor)),
        searchStudents: (students) => dispatch(searchStudents(students)),
        saveGoogleSheetStudents: (students) => dispatch(saveGoogleSheetStudents(students)),
        fetchGoogleSheetStudent: (sheet_id) => dispatch(fetchGoogleSheetStudent(sheet_id)),
        navigate: (data) => dispatch(navigate(data)),

    };
};

const mapStateToProps = (state) => {
    return {
        ...state
    };
};

const Home = connect(
    mapStateToProps, 
    mapDispatchToProps
)(HomeUI);
export default Home;
