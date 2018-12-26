
/*eslint-disable */

import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import { Button } from '@material-ui/core/';
import _ from 'lodash';
import axios from 'axios';
import EventBox from './EventBox';
import { connectWithStore } from '../../../store/index';
import {
    getDescription,
    getEndTime,
    getStartTime,
    getTitle,
    getMonth,
    remainingTime
} from '../../../selectors/eventSelectors';

import './upcomingsession.scss';


class UpcomingSessionUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            retry: true,
            events: props.events
        };
    }


    navigate = (link) => {
        return this.props.history.push(link);
    }

    getToken = () => {
        const isTokenAuthorized = JSON.parse(localStorage.getItem('isTokenAuthorized')) || false;

        if (chrome) {
            let options = { interactive: false };
            if (!isTokenAuthorized) {
                options.interactive = true;
            }
            const self = this;
            console.log('Options: ', options);
            chrome.identity.getAuthToken(options, function (token) {
                console.log('Token: ', token);
                self.fetchCalendar(token);
                localStorage.setItem('isTokenAuthorized', true);
            });
        }


    };


    fetchCalendar = (token) => {
        const params = `calendarId=primary&timeMin=${(new Date()).toISOString()}`; // upcoming events
        const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`;

        axios({
            url,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(this.handleSuccessCalendar)
            .catch(this.handleCalendarErrors);
    };

    handleSuccessCalendar = (response) => {
        const events = response.data.items;
        this.setState({ events });
        this.props.addEvents(events);

        console.log('Response Data: ', response.data);
    };

    handleCalendarErrors = (response) => {
        const errorMessage = 'Invalid Credentials';
        console.log('Errors: ', response.data);
        if (response.status === 403 && response.data.error.message === errorMessage) {
            // return this.getTokenAccessIdentity();
            console.log('Credentials: ', errorMessage);
        }

        if (response.status === 401 && this.state.retry) {
            this.setState({ retry: false });
            this.getToken();
        }

    };

    displayEvents = (events) => {
        if (_.isEmpty(events)) {
            return <p className="no-events">No Events Found!!</p>
        }
        return events.map((event, i) => <EventBox
            key={i}
            title={getTitle(event)}
            description={getDescription(event)}
            startTime={getStartTime(event)}
            endTime={getEndTime(event)}
            month={getMonth(event)}
            remainingTime={remainingTime(event)}
        />);
    };


    render() {
        console.log('State: ', this.state);

        const events = this.state.events;
        // Dummy Data
        // const events = [
        //     { description: '', startTime: '', endTime: '', month: '' },
        //     { description: '', startTime: '', endTime: '', month: '' },
        //     { description: '', startTime: '', endTime: '', month: '' },
        //     { description: '', startTime: '', endTime: '', month: '' },
        // ]
        return (
            <div className="upcomingsession">
                <Nav navigate={this.navigate} />

                <Button variant="contained" color="primary" onClick={this.getToken}>
                    Upcoming Sesssion
                </Button>

                <div className="events-container">
                    {this.displayEvents(events)}
                </div>
            </div>
        );
    }
}

const UpcomingSession = connectWithStore(UpcomingSessionUI);
export default UpcomingSession;
