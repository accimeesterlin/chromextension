import React, { Component } from 'react';
import './home.css';

class Home extends Component {

    render() {

        return (
            <div className="container">
                <p>Please select one of the option below</p>

                <div className="buttons">
                    <button className='btn'>Add a student</button>
                    <button className='btn'>Delete a student</button>
                    <button className='btn'>Add/Integrate Google Calendar</button>
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