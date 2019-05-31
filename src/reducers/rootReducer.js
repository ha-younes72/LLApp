import { combineReducers } from 'redux';
import appReducer from '../modules/app/reducer';
import authReducer from '../modules/authentication/reducer';

const rootReducer = combineReducers({
	appReducer,
	authReducer
});

export default rootReducer;
