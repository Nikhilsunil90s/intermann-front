
import AuthSaga from "./saga/auth/authenticatioSaga";
import {fork, all} from "redux-saga/effects"
export function* rootSaga () {
    yield all([
        fork(AuthSaga),       
    ]);
}