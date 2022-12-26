import { combineReducers } from 'redux';
import loginReducer from './Loginauth/loginReducer';
import { JobCenterReducer } from './jobCenter/JobCenterReducer';

const rootReducer = combineReducers({
   loginReducer,
   // JobCenterReducer
});

export default rootReducer;