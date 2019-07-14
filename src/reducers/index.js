import { combineReducers } from 'redux';


import emailReducer from './emailReducer';
import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer';
import eventReducer from './eventReducer';


const reducers = combineReducers({
    email: emailReducer,
    tutor: tutorReducer,
    students: studentReducer,
    events: eventReducer
});

export default reducers;