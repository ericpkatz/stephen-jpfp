import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

// Imported Reducers
import studentsReducer from './students';
import campusesReducer from './campuses';


export * from './students';
export * from './campuses';

const rootReducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk, //loggingMiddleware
  )
)
