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

    render() {
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
                    <option value="Peter John">Peter John</option>
                    <option value="Sarah Sardack">Sarah Sadrack</option>
                    <option value="Sonson May">Sonson May</option>
                    <option value="Sam Brown">Sam Brown</option>
                </select>
            </div>
        );
    };
}

export default Home;