import { combineReducers } from 'redux';


import email from './emailReducer';
import tutor from './tutorReducer';
import students  from './studentReducer';
import events from './eventReducer';
import templates from './templateReducer';
import messages from './messagesReducer';


const reducers = combineReducers({
    email,
    tutor,
    students,
    events,
    templates,
    messages
});

export default reducers;