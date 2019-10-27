import * as types from '../actions/types';

const initialState = {
    tutorName: '',
    rosterName: '',
    googleSheetUrl: '',
    emailAddress: '',
    messagesTotal: 0,
    threadsTotal: 0,
    historyId: 0,
    isAppInitialized: false
};



function tutorReducer(state = initialState, action) {
    const newState = { ...state };

    switch(action.type) {
        case types.TUTOR_GOOGLE_SHEET_URL:
           newState.googleSheetUrl = action.payload;
            return { ...newState };

        case types.TUTOR_NAME:
            newState.tutorName = action.payload;
            return { ...newState }

        case types.TUTOR_ROSTER_NAME:
            newState.rosterName = action.payload;
            return { ...newState }
    
        case types.GET_GMAIL_PROFILE_FULFILLED:
            return {
                ...state,
                ...(action.payload && action.payload.data)
            };
        
        case types.LOAD_DATA:
            return {
                ...state,
                isAppInitialized: true
            }
        default:
            return state;
    };
}  


export default tutorReducer;