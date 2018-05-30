const initialState = {
    username: 'accime',
    navigation: '/home'
};

const reducers = (state = initialState, action) => {

    switch (action.type) {
        case 'CHANGE_USERNAME':
            
            break;
    
        default:
            return state;
    }
};

export default reducers;