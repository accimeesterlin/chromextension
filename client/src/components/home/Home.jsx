import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../../common/Footer';
import syncStorage from '../../utils/syncStorage';

import {
    saveTutorInfo,
    fetchGoogleSheetStudent,
    saveGoogleSheetStudents,
    loadTutorInfo,
    searchStudents,
    navigate
} from '../../actions';

import './home.css';

class HomeUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowStudent: false,
            students: [...props.students],
            result_status: "success"
        };
    }

    // Navigate the user according the path selected
    navigateUser = (value) => {
        const { navigate } = this.props;
        switch (value) {
            case 'add_student':
                navigate({ url: '/add' });
                break;
            case 'delete_student':
                navigate({ url: '/delete' });
                break;

            case 'tutor_name':
                navigate({ url: '/tutor' });
                break;

            default:
                navigate({ url: '/home' });
                break;
        }
    };

    // Sends students object and tutor over to jQuery App
    // jQuery app will use these info to autofill Google Form Fields
    sendMessageToContentScripts = (students, value) => {
        try {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { students, value }, function (response) {
                    console.log(response.farewell);
                });
            });
        } catch (error) {
            // TODO
        }
    };

    // Get input values
    selectStudent = (value) => {
        const { students } = this.props;
        console.log('Value: ', value);
        this.sendMessageToContentScripts(students, value);
        this.hideStudents();
    };

    // List all students in dropdown
    listValue = (students) => {
        students.sort((a, b) => a.name === b.name ? 0 : +(a.name > b.name) || -1);
        return students.map(({
            name,
            email
        }, index) => (<a onClick={() => this.selectStudent(email)} key={index} value={email}>{name}</a>));
    };

    // Display Tutor title
    displayTutorInfo = (name) => {
        if (name) {
            return (<p className='title'>Hi, {name}</p>);
        } else {
            return '';
        }
    };

    showStudents = () => {
        this.setState({
            isShowStudent: true
        });
    }

    hideStudents = () => {
        this.setState({
            isShowStudent: false
        });
    };

    filterFunction = (event) => {
        const value = event.target.value.toLowerCase();
        const existedStudents = this.props.students;

        const matchStudents = existedStudents.filter((student) => {
            return student.name.toLowerCase().includes(value);
        });

        this.checkForResults(matchStudents);
        this.props.searchStudents(matchStudents);
    }

    checkForResults = (search_students) => {
        if (search_students.length === 0) {
            this.setState({
                result_status: 'empty'
            });
        } else {
            this.setState({
                result_status: 'success'
            });
        }
    };

    noResults = () => {
        const { result_status } = this.state;
        if (result_status === 'empty') {
            return (<p>No student found</p>);
        }
    };


    // Get Students from Storage on loads
    getStudentsFromLocalStorage = () => {
        const { saveGoogleSheetStudents, searchStudents } = this.props;
        syncStorage.getLocalStorage('students', (data) => {
            const students = data.students;
            if (students.length > 0) {
                searchStudents(students);
                saveGoogleSheetStudents(students);
            } else {
                console.log('Storage is empty');
            }
        });
    };

    // Get Tutor Infor from Local Storage
    getTutorInfoFromLocalStorage = () => {
        const { saveTutorInfo } = this.props;
        const info = ['tutor_name', 'google_sheet_url'];
        for (let i = 0; i < info.length; i++) {
            try {
                chrome.storage.sync.get(info[i], function (data) {
                    const key = info[i];
                    saveTutorInfo({ [key]: data[key] });
                })
            } catch (error) {
                // TODO
            }
        }

    };


    // On load, get students object and tutor info from local storage
    componentWillMount = () => {
        this.getStudentsFromLocalStorage();
        this.getTutorInfoFromLocalStorage();
    };


    render() {
        const { tutor_name, search_students } = this.props;
        const { isShowStudent } = this.state;
        const classShow = isShowStudent ? 'show' : '';

        return (
            <div className="container">
                {this.displayTutorInfo(tutor_name)}
                <p>Please select one of the options below:</p>

                <div className="buttons">
                    <button
                        className='btn btn-inline'
                        onClick={() => this.navigateUser('add_student')}>
                        Add a student
                    </button>

                    <button
                        className='btn btn-inline'
                        onClick={() => this.navigateUser('delete_student')}>
                        Delete a student
                    </button>

                    <button
                        className='btn btn-green'
                        onClick={() => this.navigateUser('tutor_name')}>
                        Add your tutor info
                    </button>
                </div>

                <p>Or prefill current student</p>

                <input type="text"
                    placeholder="Filter Students.."
                    id="myInput"
                    onFocus={this.showStudents}
                    onKeyUp={this.filterFunction} />

                <div className="dropdown">
                    <div id="myDropdown" className={'dropdown-content ' + classShow}>
                        {this.listValue(search_students)}
                        {this.noResults()}
                    </div>
                </div>

                <Footer />
            </div>
        );
    };
}

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

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUI);
export default Home;
