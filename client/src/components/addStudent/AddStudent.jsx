import React, { Component } from 'react';
import NavigationButton from '../../common/NavigationButton';
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

    render() {
        return (
            <div className='add-student'>
                <form onSubmit={this.submit}>
                    <div>
                        <label htmlFor='name'>Student Name: </label>
                        <input type='text' name='name' onChange={this.handleChange} />
                    </div>

                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input type="text" name='email' onChange={this.handleChange} />
                    </div>

                    <div>
                        <label htmlFor='code'>Class Code: </label>
                        <input type='text' name='code' onChange={this.handleChange} />
                    </div>

                    <div>
                        <label htmlFor='username'>Github Username</label>
                        <input type='text' name='username' onChange={this.handleChange} />
                    </div>

                    <NavigationButton navigate={this.props.navigate} url='/home'>
                        <button>Add a student</button>
                    </NavigationButton>
                </form>
            </div>
        );
    }
};

export default AddStudent;