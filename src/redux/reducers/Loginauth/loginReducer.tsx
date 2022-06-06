import * as types from '../../types';

const initialState = {
  login: { token: "" },
  loginerror: {},
}

function loginReducer(state = initialState, action: any) {
  console.log(action);
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        login: action.response
      };

    case types.LOGIN_USER_ERROR:
      return {
        ...state,
        loginerror: action.error
      };
    case types.LOGOUT_USER:
      return {
        state: initialState
      }
    default:
      return { ...state };
  };

};
export default loginReducer;