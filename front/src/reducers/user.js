import produce from 'immer';

export const initialState = {
  logInLoading: false,
  logInDone: false,
  logInError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  loadUserInfoLoading: false,
  loadUserInfoDone: false,
  loadUserInfoError: null,
  me: null,
}

// action type
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInError = null;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutError = null;
        draft.logOutDone = true;
        draft.logInDone = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpError = null;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpDone = false;
        draft.signUpError = action.error;
        break;
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true;
        draft.loadUserInfoError = null;
        draft.loadUserInfoDone = false;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoError = null;
        draft.loadUserInfoDone = true;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = action.error;
        break;
      default:
        break;
    }
  })
}

export default reducer;