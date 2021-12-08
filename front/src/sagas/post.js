import {all, fork, call, put, takeLatest, delay} from '@redux-saga/core/effects';
import axios from 'axios';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, IMAGE_UPLOAD_FAILURE, IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS } from '../reducers/post';
import * as api from '../api/post';
// function imageUploadAPI(data) {
//   return axios.post('/post/images', data);
// }
function* imageUpload(action) {
  try {
    const result = yield call(api.imageUploadAPI, action.data);
    console.log(result);
    yield put({
      type: IMAGE_UPLOAD_SUCCESS,
      data: result,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: IMAGE_UPLOAD_FAILURE,
      data: err.response.data,
    })
  }
}
function* addPost(action) {
  try {
    const result = yield call(api.addPostAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    })
  } catch(err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
      })
  }
}
function* watchImageUpload() {
  yield takeLatest(IMAGE_UPLOAD_REQUEST, imageUpload);
}
function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
export default function* postSaga() {
  yield all([fork(watchImageUpload), fork(watchAddPost)]);
}