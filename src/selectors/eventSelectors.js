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
    const time = startObj(event).dateTime;
    return moment(time).format('MMM Do');
};

export const getStartTime = (event) => {
    const time = startObj(event).dateTime;
    return moment(time).format('hh:mm a');
};

export const getEndTime = (event) => {
    const time = endObj(event).dateTime;
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
    let start = startObj(event).dateTime;
    return  moment(start).fromNow(true)
}