import React from 'react';
import Paper from './Paper';
import _ from 'lodash';

const Calendar = ({ events }) => {
    return (
        <div className="calendar">
            {_.isEmpty(events) ? <p>No events</p> :  events.map((event, i) => (
                <Paper event={event} key={i}/>
            ))}
        </div>
    );
};


export default Calendar;