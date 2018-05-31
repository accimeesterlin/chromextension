import React, { Component } from 'react';
import './home.css';

class Home extends Component {

    navigateUser = (value) => {
        const { navigate } = this.props;
        switch (value) {
            case 'add_student':
                navigate({ url: '/add' });
                break;
            case 'delete_student':
                navigate({ url: '/delete' });
                break;

            case 'integrate_google':
                navigate({ url: '/integrate' });
                break;

            default:
                navigate({ url: '/home' });
                break;
        }
    };



    optionValue = (students) => {
        return students.map(({ name }, index) => (
            <option key={index} value={name}>{name}</option>
        ));
    };

    render() {
        const { students } = this.props;

        console.log('Students: ', students);
        return (
            <div className="container">
                <p>Please select one of the option below</p>

                <div className="buttons">
                    <button
                        className='btn'
                        onClick={() => this.navigateUser('add_student')}>
                        Add a student
                    </button>

                    <button
                        className='btn'
                        onClick={() => this.navigateUser('delete_student')}>
                        Delete a student
                    </button>

                    <button
                        className='btn'
                        onClick={() => this.navigateUser('integrate_google')}>
                        Add/Integrate Google Calendar
                    </button>
                </div>

                <p>Or prefill current student</p>

                <select id='select_student'>
                    {this.optionValue(students)}
                </select>
            </div>
        );
    };
}

export default Home;