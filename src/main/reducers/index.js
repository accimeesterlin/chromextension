import { combineReducers } from 'redux';


import emailReducer from './emailReducer';
import tutorReducer from './tutorReducer';
import studentReducer from './studentReducer';


const reducers = combineReducers({
    email: emailReducer,
    tutor: tutorReducer,
    student: studentReducer
});

export default reducers;