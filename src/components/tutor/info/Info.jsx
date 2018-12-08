import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import Form from './Form';
import axios from 'axios';

import { connectWithStore } from '../../../store/index';

import './info.scss';


class InfoUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            googleSheetUrl: props.googleSheetUrl || '',
            tutorName: props.tutorName || '',
            rosterName: props.rosterName || ''
        };
    }

    fetchGoogleSheet = async () => {
        const { googleSheetUrl, rosterName } = this.state;
        const sheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(googleSheetUrl)[1];
        const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${rosterName}?`;
        const params = `key=AIzaSyCqo2Ufn8KUXDBUxHUc7MBXoXv8wdBOfK0`;

        const values = await axios({ url: `${endpoint}${params}`, method: 'GET' });
        const data = values.data && values.data.values ? values.data.values : [];
        this.addStudentToStore(data);
    };

    addStudentToStore = (data) => {
        for (let i = 0; i < data.length; i++) {
            try {
                const email = data[i][3];
                if (email.includes('@')) {
                    this.props.addStudents({
                        name: data[i][2],
                        githubUsername: data[i][4],
                        email,
                        studentCode: data[i][0]
                    });
                }
            } catch (error) {
                console.log('Error is displaying');
                // TODO
                // Handle multiple cases of failures
            }
        }
    };


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

        const { tutorName, googleSheetUrl, rosterName } = this.state;

        this.props.saveTutorInfo({
            tutorName,
            googleSheetUrl,
            rosterName
        });

        this.fetchGoogleSheet();

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