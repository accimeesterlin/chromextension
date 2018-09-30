export const getRosterStatus  = (state) => {
    return state.roster_status;
};

export const isRosterPending = (state) => {
    return getRosterStatus(state).status === 'pending';
};


export const isRosterSuccess = (state) => {
    return getRosterStatus(state).status === 'success';
};


export const isRosterRejected = (state) => {
    return getRosterStatus(state).status === 'rejected';
};

export const isRosterIdle = (state) => {
    return getRosterStatus(state).status === 'idle';
};

