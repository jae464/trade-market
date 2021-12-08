import produce from "immer";

export const initialState = {
  imagePaths: [],
  mainPosts: [],
  imageUploadLoading: false,
  imageUploadDone: false,
  imageUploadError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

}

// action type
export const IMAGE_UPLOAD_REQUEST = 'IMAGE_UPLOAD_REQUEST';
export const IMAGE_UPLOAD_SUCCESS = 'IMAGE_UPLOAD_SUCCESS';
export const IMAGE_UPLOAD_FAILURE = 'IMAGE_UPLOAD_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
export const REMOVE_ALL_IMAGES = 'REMOVE_ALL_IMAGES';
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch(action.type) {
      case IMAGE_UPLOAD_REQUEST:
        draft.imageUploadLoading = true;
        draft.imageUploadError = null;
        draft.imageUploadDone = false;
        break;
      case IMAGE_UPLOAD_SUCCESS:
        draft.imageUploadLoading = false;
        draft.imageUploadError = null;
        draft.imageUploadDone = true;
        draft.imagePaths = action.data;
        break;
      case IMAGE_UPLOAD_FAILURE:
        draft.imageUploadLoading = false;
        draft.imageUploadError = null;
        draft.imageUploadDone = true;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostError = null;
        draft.addPostDone = true;
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = null;
        draft.addPostDone = true;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths.splice(action.data, 1);
        break;
      case REMOVE_ALL_IMAGES:
        draft.imagePaths = [];
        break;
      default:
        break;
    }
  })
}

export default reducer;