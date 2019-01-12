import moment from 'moment';

export const getCreator = (event) => {
    return event.creator;
};

export const getOrganizater = (event) => {
    return event.organizer;
};


export const startObj = (event) => {
    return event.start;
};


export const endObj = (event) => {
    return event.end;
};



export const getMonth = (event) => {
    let time;
    if (startObj(event).dateTime) {
        time = startObj(event).dateTime;
    } else {
        time = startObj(event).date;
    }
    return moment(time).format('MMM Do');
};

export const getStartTime = (event) => {
    let time;
    if (startObj(event).dateTime) {
        time = startObj(event).dateTime;
    } else {
        time = startObj(event).date;
    }
    return moment(time).format('hh:mm a');
};

export const getEndTime = (event) => {
    let time;

    if (endObj(event).dateTime) {
        time = endObj(event).dateTime;
    } else {
        time = endObj(event).date
    }
    return moment(time).format('hh:mm a');
};

export const getDescription = (event) => {
    const description = event.description || 'No description'
    if (description.length > 130) {
        return description.slice(0, 130) + "..." || '';
    }
    return description;
};

export const getTitle = (event) => {
    return event.summary;
};

export const getEmail = (event) => {
    return getCreator(event).email;
};


export function remainingTime(event) {
    let time;
    if (startObj(event).dateTime) {
        time = startObj(event).dateTime;
    } else {
        time = startObj(event).date;
    }
    return  moment(time).fromNow(true)
}