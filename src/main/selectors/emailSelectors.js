import moment from "moment";
import { isEmpty } from 'lodash';

// Constants
const defaultDateMessage = 'No date found';
const defaultReceiverMessage = 'No receiver found';
const defaultSubjectMessage = 'No subject found';


// Convert headers array from payload into a key value pair
export const convertArrToObject = payload => {
    let obj = {};
    const headers = (payload && payload.headers);

    if (isEmpty(payload) || isEmpty(headers)) return obj;
    headers.map(({ name, value  }) => (obj[name] = value));

    return obj;
};


// Header Selectors
export const getSubject = payload => {
    const obj = convertArrToObject(payload);
    const subject = obj.Subject || defaultSubjectMessage;
    return subject;
};

export const getDate = payload => {
    const obj = convertArrToObject(payload);

    if (isEmpty(obj)) return defaultDateMessage;

    const date = moment(obj.Date).format("MMM, D") || defaultDateMessage;
    return date;
};

export const getReceiver = payload => {
    const obj = convertArrToObject(payload);

    if (isEmpty(obj)) return defaultReceiverMessage;

    const reciever = (obj && obj.From).replace(/[^@<\s]+@[^@\s>]+/g, "")
    const receiverName = reciever.slice(0, reciever.length - 2) || defaultReceiverMessage;
    return receiverName;
};

export const getSnippet = snippet => {
    if (isEmpty(snippet)) return '';

    return snippet.slice(0, 50) + '...'
};


// Gmail state selectors
export const getGmail = (state) => (state && state.gmail) || {};
export const getMessages = (state) => getGmail(state).messages || [];
export const getLabels = (state) => getGmail(state).labels || [];
export const getResultSizeEstimate = (state) => getGmail(state).resultSizeEstimate;
export const getNextPageToken = (state) => getGmail(state).nextPageToken || '';


export const getEmail = (state) => (state && state.email) || {};

export const getReceiverDetails = (state) => getEmail(state).receiverDetails || {};

export const getReceiverEmail = (state) => getReceiverDetails(state).email || '';
export const getReceiverSubject = (state) => getReceiverDetails(state).subject || '';
export const getReceiverMsg = (state) => getReceiverDetails(state).msg || '';
