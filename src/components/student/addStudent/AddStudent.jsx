import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import Form from './Form';

import './addStudent.scss';


export default class AddStudent extends Component {
    state = {
        value: ''
    };

    navigate = (link) => {

        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleChange = () => {

    };


    render() {
        return(
            <div className="addStudent">
                <Nav navigate = {this.navigate}/>
                <Form 
                    handleChange = {this.handleChange}
                    value={this.state.value}
                />
            </div>
        );
    }
}