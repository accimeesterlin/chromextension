import { combineReducers } from 'redux';


import email from './emailReducer';
import tutor from './tutorReducer';
import students  from './studentReducer';
import events from './eventReducer';
import templates from './templateReducer';
import gmail from './gmailReducer';
import notifications from './notificationReducer';
import routeReducer from './routeReducer';


const reducers = combineReducers({
    email,
    tutor,
    students,
    events,
    templates,
    gmail,
    route: routeReducer,
    notifications 
});

export default reducers;