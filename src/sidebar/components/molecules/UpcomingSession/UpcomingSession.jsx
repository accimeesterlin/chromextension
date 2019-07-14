
/*eslint-disable */

import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core/';
import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import EventBox from './EventBox';
import { connect } from 'react-redux';
import {
    getDescription,
    getEndTime,
    getStartTime,
    getTitle,
    getMonth,
    remainingTime
} from '../../../selectors/eventSelectors';
import { addEvent, loadEvents } from '../../../../actions/actionCreators';

import * as tutorUtils from '../../../utils/tutorUtils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './upcomingsession.scss';

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
            this.setState({ isToken: true });
            return this.fetchCalendar(token);
        }
        this.setState({ isToken: false });

        if (window.ga) {
            window.ga('send', {
                hitType: 'pageview',
                page: '/upcoming/session',
                title: 'Upcoming Session'
            });
        }


    };


    viewEventDetails = (htmlLink) => {
        window.open(htmlLink, '_blank');
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
        const timeMax = new Date(moment().add(3, 'M')).toISOString();
        const params = `calendarId=primary&timeMin=${(new Date()).toISOString()}&orderBy=startTime&singleEvents=true&timeMax=${timeMax}`; // upcoming events
        const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`;

        this.setState({ isPending: false });
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
        this.setState({ events, isToken: true, retry: true, isPending: false });
        this.props.loadEvents(events);
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

        this.setState({ retry: false, isToken: false, isPending: false });

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
                    htmlLink={event.htmlLink}
                    viewEventDetails={this.viewEventDetails}
                />
            }
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };


    // Sorting events by Date or Only Tutoring
    sortEventsByDate = (events) => {
        let results = events || [];

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
        const { events, isToken, isPending } = this.state;

        const filterEvents = this.sortEventsByDate(events);

        return (
            <div>
                {isPending && _.isEmpty(events) ? <p>Fetching events...</p> : null}
                {!isToken ? <Button variant="contained" color="primary" onClick={this.getToken}>
                    Upcoming Sesssion
                </Button> : null}

                {this.displayFilter()}

                <div className="events-container">
                    {this.displayEvents(filterEvents)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const events = state.events;

    return {
        events
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (event) => dispatch(addEvent(event)),
        loadEvents: (events) => dispatch(loadEvents(events))
    };
};

const UpcomingSession = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingSessionUI);
export default UpcomingSession;
