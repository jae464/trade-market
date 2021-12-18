import {all, fork, call, put, takeLatest, delay} from '@redux-saga/core/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, LOAD_MY_POST_FAILURE, LOAD_MY_POST_REQUEST, LOAD_MY_POST_SUCCESS } from '../reducers/post';
import * as api from '../api/post';
import * as api2 from '../api/posts'


function* addPost(action) {
  try {
    const result = yield call(api.addPostAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
      })
  }
}

function* loadMyPost(action) {
  try {
    const result = yield call(api2.loadMyPostsAPI, action.data);
    console.log(result);
    yield put({
      type: LOAD_MY_POST_SUCCESS,
      data: result,
    })
  } catch (err){
    console.error(err);
    yield put({
      type: LOAD_MY_POST_FAILURE,
      data: err.response.data,
    })
  }
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchLoadMyPost() {
  yield takeLatest(LOAD_MY_POST_REQUEST, loadMyPost);
}
export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadMyPost)]);
}