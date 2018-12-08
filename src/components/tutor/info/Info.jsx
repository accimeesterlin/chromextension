import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import Form from './Form';

import './info.scss';

export default class Info extends Component {
    constructor() {
        super();

        this.state = {
            googleSheetUrl: '',
            tutorName: ''
        };
    }
    navigate = (link) => {

        console.log('Link: ', link);
        return this.props.history.push(link);
    }

    handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        });
    };


    render() {
        return(
            <div className="info">
                <Nav navigate = {this.navigate}/>
                <Form handleChange={this.handleChange} {...this.state}/>
            </div>
        );
    }
}