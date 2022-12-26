
import AuthSaga from "./saga/auth/authenticatioSaga";
import {fork, all} from "redux-saga/effects"
// import JobSaga from "./saga/Jobcenter/JobSaga";
export function* rootSaga () {
    yield all([
        fork(AuthSaga),    
        // fork(JobSaga)   
    ]);
}