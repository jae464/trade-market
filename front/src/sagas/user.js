import {all, fork, call, put, takeLatest, delay, take} from '@redux-saga/core/effects';
import axios from 'axios';
import { LOAD_USER_INFO_FAILURE, LOAD_USER_INFO_REQUEST, LOAD_USER_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user';

function logInAPI(data) {
  return axios.post('/user/login', data);
}
function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpAPI(data) {
  return axios.post('/user', data)
}
function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put ({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutAPI(data) {
  return axios.post('/user/logout');
}
function* logOut(action) {
  try {
    yield call(logOutAPI, action.data);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}
function loadUserInfoAPI() {
  return axios.get('/user');
}
function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    })
  }
}
function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}
export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchSignUp), fork(watchLogOut),
    fork(watchLoadUserInfo)]);
}