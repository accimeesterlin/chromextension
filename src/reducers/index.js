import { combineReducers } from 'redux';


import email from './emailReducer';
import tutor from './tutorReducer';
import students  from './studentReducer';
import events from './eventReducer';
import templates from './templateReducer';


const reducers = combineReducers({
    email,
    tutor,
    students,
    events,
    templates
});

export default reducers;