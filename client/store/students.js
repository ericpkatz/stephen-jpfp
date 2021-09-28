import axios from 'axios';
import { withRouter } from 'react-router-dom';

// Action Type Constants
const LOAD_STUDENTS = 'LOAD_STUDENTS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const LOAD_ENROLLED_CAMPUS = 'LOAD_ENROLLED_CAMPUS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

// Action Creators
const _loadStudents = (students) => {
  return {
    type: LOAD_STUDENTS,
    students
  };
};

const _createStudent = (student) => {
  return {
    type: CREATE_STUDENT,
    student,
  };
};

const _loadEnrolledCampus = (id) => {
  return {
    type: LOAD_ENROLLED_CAMPUS,
    id
  };
};

const _deleteStudent = (student) => {
  return {
    type: DELETE_STUDENT,
    student
  };
};

const _updateStudent = (student) => {
  return {
    type: UPDATE_STUDENT,
    student
  };
};


// Thunk Creators
export const fetchStudents = () => {
  return async (dispatch) => {
    const { data: students } = await axios.get('/api/students');
    dispatch(_loadStudents(students));
  };
};

export const createStudent = (student, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/students', student);
    dispatch(_createStudent(created));    
  };
};

export const fetchEnrolledCampus = (students, studentId, campusId) => {
  return async (dispatch) => {
    const { data: campus } = await axios.get(`/api/campuses/${id}`);
    dispatch(_loadEnrolledCampus(campus.name))
  };
};

export const destroyStudent = (id, history)=> {
  return async(dispatch)=> {
    await axios.delete(`/api/students/${id}`);
    dispatch(_deleteStudent({ id: id * 1 }));    
  };
};

export const updateStudent = (student, history)=> {
  return async (dispatch) => {
    const updated = (await axios.put(`/api/students/${student.id}`, student)).data;
    dispatch(_updateStudent(updated));    
  };
};


// Reducer
export default (state = [], action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      return [...state, action.student];
    case DELETE_STUDENT:
      return state.filter((student) => student.id !== action.student.id);
    case UPDATE_STUDENT:
      return state.map((student) => student.id === action.student.id ? action.student : student);
    default: 
      return state;
  }
};