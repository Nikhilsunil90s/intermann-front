import { combineReducers } from 'redux';
import loginReducer from './Loginauth/loginReducer';
import { JobCenterReducer } from './jobCenter/JobCenterReducer';
import CommercialCenterSlice from '../slice/CommercialCenterSlice';

const rootReducer = combineReducers({
   loginReducer,
   // JobCenterReducer
   CommercialCenterSlice
});

export default rootReducer;