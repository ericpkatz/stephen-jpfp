import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';

// Imported Reducers
import studentsReducer from './students';
import campusesReducer from './campuses';
import filterReducer from './filter';


export * from './students';
export * from './campuses';
export * from './filter';

const rootReducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
  filterView: filterReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk, //loggingMiddleware
  )
)
