const LOAD_STUDENT_PROFILE = 'LOAD_STUDENT_PROFILE';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_STUDENT_PROFILE:
      return action.studentProfile;
    default:
      return state;
  }
};