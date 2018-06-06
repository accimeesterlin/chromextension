import React, { Component } from 'react';
import Footer from '../../common/Footer';
import './addstudent.css';
class AddStudent extends Component {

    // Store the value from the input in the store
    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.props.getValue({
            [name]: value
        });

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

    };


    render() {
        const { username, name, code, email } = this.props;

        return (
            <div className='add-student form-container'>
                <button className='go-back' onClick={() => this.props.navigate({ url: '/home' })}>Go back</button>

                <div className="notify">
                    {this.props.displayNotification()}
                </div>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='name'>Student Name: </label>
                        <input
                            type='text'
                            name='name'
                            placeholder='Your student name'
                            required
                            onChange={this.handleChange}
                            value={name} />
                    </div>

                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type="email"
                            name='email'
                            placeholder='Your student email'
                            required
                            onChange={this.handleChange}
                            value={email} />
                    </div>

                    <div>
                        <label htmlFor='code'>Class Code: </label>
                        <input
                            type='text'
                            name='code'
                            placeholder='Your student code'
                            required
                            onChange={this.handleChange}
                            value={code} />
                    </div>

                    <div>
                        <label htmlFor='username'>Github Username</label>
                        <input
                            type='text'
                            name='username'
                            placeholder='Your student github username'
                            required
                            onChange={this.handleChange}
                            value={username} />
                    </div>

                    <button>Add a student</button>
                </form>

                <Footer />
            </div>
        );
    }
};

export default AddStudent;