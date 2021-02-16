import { combineReducers } from 'redux';
import alert from './Alert';
import auth from './Auth';
import board from './Board';

export default combineReducers({ alert, auth, board });