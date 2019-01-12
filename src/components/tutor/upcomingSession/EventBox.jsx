import React from 'react';

const EventBox = ({ htmlLink, title, description, startTime, endTime, month, remainingTime, viewEventDetail }) => {

    return (
        <div className="event-box" onClick={() => viewEventDetail(htmlLink)}>
            <h2>{title}</h2>
            <p className="event-box__time">{month} | {startTime} - {endTime} </p>
            {/* <p>{description}</p> */}
            <p>{remainingTime} - remaining</p>
        </div>
    );
};


export default EventBox;