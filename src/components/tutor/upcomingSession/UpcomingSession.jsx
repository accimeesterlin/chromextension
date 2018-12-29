
/*eslint-disable */

import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import { Button, TextField } from '@material-ui/core/';
import _ from 'lodash';
import moment from 'moment';
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
import * as tutorUtils from '../../../utils/tutorUtils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './upcomingsession.scss';
import events from './events';

class UpcomingSessionUI extends Component {
    constructor(props) {
        super(props);

        this.state = {
            retry: true,
            // events: props.events.length > 0 ? props.evnets : events, // temporary
            events: props.events,
            isTutoring: false,
            isToken: true
        };
    }


    componentDidMount = () => {
        const token = localStorage.getItem('token');

        if (token) {
            return this.fetchCalendar(token);
        }
        this.setState({ isToken: false });

    };


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
            chrome.identity.getAuthToken(options, function (token) {
                self.fetchCalendar(token);
                self.setState({ isToken: true, retry: true });
                localStorage.setItem('isTokenAuthorized', true);
                localStorage.setItem('token', token);
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
        this.setState({ events, isToken: true, retry: true });
        this.props.addEvents(events);
    };

    handleCalendarErrors = (response) => {
        console.log('Errors: ', response.data);
        if (response.status === 401) {
            this.setState({ isToken: false });
            return
        }

        if (this.state.retry && this.state.isToken) {
            const token = localStorage.getItem('token');
            chrome.identity.removeCachedAuthToken({ token }, this.getToken);
        }

        this.setState({ retry: false, isToken: false });

        console.log('No able to fetch events!!!');

    };

    displayEvents = (events) => {
        if (_.isEmpty(events)) {
            return <p className="no-events">No Events Found!!</p>
        }
        return events.map((event, key) => {
            const title = getTitle(event);
            if (event.status === 'confirmed' && !title.includes('Canceled')) {
                return <EventBox
                    key={key}
                    title={title}
                    description={getDescription(event)}
                    startTime={getStartTime(event)}
                    endTime={getEndTime(event)}
                    month={getMonth(event)}
                    remainingTime={remainingTime(event)}
                />
            }
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    // Sorting events by Date or Only Tutoring
    sortEventsByDate = (events) => {
        let results = [];
        if (events.length > 0) {
            results = events
                .sort((a, b) => moment(a.start.dateTime).unix() - moment(b.start.dateTime).unix());
        }

        if (this.state.isTutoring) {
            return results
                .filter((event) => tutorUtils.isTutoringSession(event));
        }

        return results;
    };


    displayFilter = () => {

        if (this.state.events.length > 0) {
            return <div className="events-main">
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange('isTutoring')}
                            value="checkedB"
                            color="primary"
                        />
                    }
                    label="Only tutoring"
                />
            </div>
        }
    };


    render() {
        console.log('State: ', this.state);

        const events = this.sortEventsByDate(this.state.events);
        return (
            <div className="upcomingsession">
                <Nav navigate={this.navigate} />

                {!this.state.isToken ? <Button variant="contained" color="primary" onClick={this.getToken}>
                    Upcoming Sesssion
                </Button> : null}

                {this.displayFilter()}

                <div className="events-container">
                    {this.displayEvents(events)}
                </div>
            </div>
        );
    }
}

const UpcomingSession = connectWithStore(UpcomingSessionUI);
export default UpcomingSession;
