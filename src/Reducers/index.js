import { combineReducers } from 'redux';
import movieRecogniserReducer from './MovieRecogniserReducer';

export default combineReducers({
  movieRecogniser: movieRecogniserReducer
});
