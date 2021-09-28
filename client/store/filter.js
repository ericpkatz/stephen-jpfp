import axios from 'axios';
import { withRouter } from 'react-router-dom';

// Action Type Constants
const FILTER_BY_CAMPUS = 'FILTER_BY_CAMPUS';

// Action Creators
const _filterByCampus = (students) =>{
  return {
    type: FILTER_BY_CAMPUS,
    students
  };
};

// Thunk Creators
export const changeFilter = (filters) => {
  return (dispatch) => {
    dispatch(_filterByCampus(
      filters.students.filter( student => !student.campusId && filters.filterId * 1 === 999 ? true 
        : student.campusId * 1 === filters.filterId * 1 ? true 
          : false)
    ));
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case FILTER_BY_CAMPUS:
      return action.students;
    default: 
      return state;
  }
};