import { put ,takeEvery} from 'redux-saga/effects';
import { API_BASE_URL } from '../../../config/serverApiConfig';
import * as types from '../../types'

function*  FetchData(){
  let  data =yield fetch(API_BASE_URL +"allAds/?market=ROMANIA")
     data =yield  data.json()
     yield put({type :types.JOB_CENTER, data})
     console.log(data,"heyData")
}


function* JobSaga() {
    yield takeEvery(types.JOB_CENTER, FetchData)
}

export default JobSaga;