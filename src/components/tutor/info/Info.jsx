import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import Form from './Form';
import { connectWithStore } from '../../../store/index';


import './info.scss';
class InfoUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            googleSheetUrl: props.googleSheetUrl || '',
            tutorName: props.tutorName || ''
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

    handleSubmit = (event) => {
        event.preventDefault();

        const tutorName = this.state.tutorName;
        const googleSheetUrl = this.state.googleSheetUrl;

        this.props.saveTutorInfo({
            tutorName,
            googleSheetUrl
        });

        this.setState({
            tutorName: '',
            googleSheetUrl: ''
        });

        console.log('State: ', this.state);
    };


    render() {
        return (
            <div className="info">
                <Nav navigate={this.navigate} />
                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    {...this.state} />
            </div>
        );
    }
}

const Info = connectWithStore(InfoUI);


export default Info;