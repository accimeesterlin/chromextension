import Home from '../molecules/Home';
import AddStudent from '../molecules/AddStudent';
import DeleteStudent from '../molecules/DeleteStudent';
import UpcomingSession from '../molecules/UpcomingSession';
import Info from '../molecules/Info';
import ErrorComponent from '../errors/ErrorComponent';
import withNav from '../HOC/withNav';

const HomeWithNav = withNav(Home, 'home');
const AddStudentWithNav = withNav(AddStudent, 'addStudent');
const DeleteStudentWithNav = withNav(DeleteStudent, 'deleteStudent');
const UpcomingSessionWithNav = withNav(UpcomingSession, 'upcomingsession');
const InfoWithNav = withNav(Info, 'info');
const ErrorComponentWithNav = withNav(ErrorComponent, 'errors');


export {
    HomeWithNav,
    AddStudentWithNav,
    DeleteStudentWithNav,
    UpcomingSessionWithNav,
    InfoWithNav,
    ErrorComponentWithNav
}