import axios from 'axios';

// Action Type Constants
const LOAD_CAMPUSES = 'LOAD_CAMPUSES';
const CREATE_CAMPUS = 'CREATE_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// Action Creators
const _loadCampuses = (campuses) => {
  return {
    type: LOAD_CAMPUSES,
    campuses
  };
};

const _createCampus = (campus) => {
  return {
    type: CREATE_CAMPUS,
    campus
  };
};

const _deleteCampus = (campus) => {
  return {
    type: DELETE_CAMPUS,
    campus
  };
};

const _updateCampus = (campus) => {
  return {
    type: UPDATE_CAMPUS,
    campus
  };
};

// Thunk Creators
export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data: campuses } = await axios.get('/api/campuses');
    dispatch(_loadCampuses(campuses));
  };
};

export const createCampus = (campus, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/campuses', campus);
    dispatch(_createCampus(created));
    history.push(`/campuses/${ created.id }`);
  };
};

export const destroyCampus = (id, history)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/campuses/${id}`);
    dispatch(_deleteCampus({ id: id * 1 }));
    history.push('/campuses');
  };
};

export const updateCampus = (campus, history)=> {
  return async (dispatch) => {
    const updated = (await axios.put(`/api/campuses/${campus.id}`, campus)).data;
    dispatch(_updateCampus(updated));
    history.push('/');
  };
};

// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_CAMPUSES:
      return action.campuses;
    case CREATE_CAMPUS:
      return [...state, action.campus];  
    case DELETE_CAMPUS:
      return state.filter((campus) => campus.id !== action.campus.id);  
    case UPDATE_CAMPUS:
      return state.map((campus) => campus.id === action.campus.id ? action.campus : campus);  
    default: 
      return state;
  }
};
