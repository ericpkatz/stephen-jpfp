const LOAD_CAMPUS_PROFILE = 'LOAD_CAMPUS_PROFILE';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_CAMPUS_PROFILE:
      return action.campusProfile;
    default: 
      return state;
  }
};