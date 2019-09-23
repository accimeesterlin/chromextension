export const getTutor = (state) => (state && state.tutor) || {};

export const getTutorEmailAddress = (state) => getTutor(state).emailAddress || '';
