import { combineReducers } from 'redux';
import loginReducer from './Loginauth/loginReducer';
import CommercialCenterSlice from '../slice/CommercialCenterSlice';

const rootReducer = combineReducers({
   loginReducer,
   // JobCenterReducer
   CommercialCenterSlice
});

export default rootReducer;