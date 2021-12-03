import axios from 'axios';
import {all, fork} from 'redux-saga/effects';

import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga)]);
}