import {LOGIN_USER} from '../types'
import {LOGOUT_USER} from '../types'
export const loginUserAction = (user:any) => {
    return {
      type: LOGIN_USER,
      user
    }
  };

  export const logout=()=>{
    return{type :LOGOUT_USER}
  }

