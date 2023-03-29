import { put, call, takeLatest } from "redux-saga/effects";
import * as types from "../../types";
import { loginUserService } from "./authenticationService";

export function* loginSaga(action: any) {
  try {
    let response = yield call(loginUserService, action.user);
    response = JSON.parse(response);
    // console.log(response);

    yield put({ type: types.LOGIN_USER_SUCCESS, response: response });
  } catch (error: any) {
    yield put({ type: types.LOGIN_USER_ERROR, error: error });
  }
}
export default function* AuthSaga() {
  yield takeLatest(types.LOGIN_USER, loginSaga);
}
