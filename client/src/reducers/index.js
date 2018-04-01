
import {combineReducers} from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import authReducer from './authReducer';
import todoReducer from './todoReducer';

/**
 * Reducers combiner
 * This combines all the reducers for redux
 */

const rootReducer = combineReducers({
  auth: authReducer,
  loadingBar: loadingBarReducer,
  todo: todoReducer,
});

export default rootReducer;