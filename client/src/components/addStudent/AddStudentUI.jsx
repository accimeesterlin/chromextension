import React, { Component } from 'react';
import Footer from '../../common/Footer';
import { connect } from 'react-redux';
import { Input, Form } from 'semantic-ui-react';
import { getValue, saveStudents, loadLastStudent, navigate } from '../../actions';
import './addstudent.css';
class AddStudentUI extends Component {


    componentDidMount = () => {
        try {
            this.getStudentInfoFromLocalStorage();
        } catch (error) {
            // TODO
        }
    };

    getStudentInfoFromLocalStorage = () => {
        chrome.storage.sync.get(['name', 'code', 'email', 'username'], (student) => {
            console.log('Student Local Storage: ', student);
            this.props.loadLastStudent(student);
        });
    };

    storeStudentBasicInfo = (data) => {
        try {
            chrome.storage.sync.set(data, () => {
                console.log('Student Info has successfully been saved into Local Storage');
            });
        } catch (error) {
            // TODO
        }
    };

    // Store the value from the input in the store
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.getValue({
            [name]: value
        });

        this.storeStudentBasicInfo({
            [name]: value
        });

    };

    resetStudentInfoInStorage = () => {
        try {
            chrome.storage.sync.set({
                name: '',
                email: '',
                code: '',
                username: ''
            });
        } catch (error) {
            // TODO
        }
    };

    submit = (event) => {
        event.preventDefault();
        const { code, email, name, username } = this.props;

        this.props.saveStudents({
            code,
            email,
            name,
            username
        });
        this.resetStudentInfoInStorage();
    };


    render() {
        const { username, name, code, email } = this.props;

        return (
            <div className='add-student form-container'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}><i className="fas fa-long-arrow-alt-left fa-3x"></i></button>

                <div className="notify">
                    {this.props.displayNotification()}
                </div>
                <Form onSubmit={this.submit}>

                    <Form.Field 
                        control={Input}
                        label='Student Name: '
                        name='name'
                        onChange={this.handleChange}
                        value={name}
                        placeholder='Your student name'
                    />

                    <Form.Field 
                        control={Input}
                        label='Email: '
                        name='email'
                        onChange={this.handleChange}
                        value={email}
                        placeholder='Your student email'
                    />

                    <Form.Field 
                        control={Input}
                        label='Class Code:'
                        name='code'
                        onChange={this.handleChange}
                        value={code}
                        placeholder='Your student class code'
                    />

                    <Form.Field 
                        control={Input}
                        label='Github Username: '
                        name='username'
                        onChange={this.handleChange}
                        value={username}
                        placeholder='Your student github username'
                    />

                    <button>Add a student</button>
                </Form>

                <Footer />
            </div>
        );
    }
};

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

const AddStudent = connect(mapStateToProps, mapDispatchToProps)(AddStudentUI);
export default AddStudent;