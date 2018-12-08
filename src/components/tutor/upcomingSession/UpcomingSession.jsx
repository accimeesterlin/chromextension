import React, { Component } from 'react';
import Nav from '../../../common/nav/Nav';
import Calendar from './Calendar';
import { connectWithStore } from '../../../store/index';

import './upcomingsession.scss';

class UpcomingSessionUI extends Component {
    navigate = (link) => {
        return this.props.history.push(link);
    }

    render() {

        // Dummy Data
        const events = [
            { description: '', startTime: '', endTime: '', month: '' },
            { description: '', startTime: '', endTime: '', month: '' },
            { description: '', startTime: '', endTime: '', month: '' },
            { description: '', startTime: '', endTime: '', month: '' },
        ]
        return (
            <div className="upcomingsession">
                <Nav navigate={this.navigate} />
                <Calendar events={events} />
            </div>
        );
    }
}

const UpcomingSession = connectWithStore(UpcomingSessionUI);
export default UpcomingSession;