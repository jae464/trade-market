import produce from "immer";

export const initialState = {
  posts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadMyPostLoading: false,
  loadMyPostDone: false,
  loadMyPostError: null,

}

// action type
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const LOAD_MY_POST_REQUEST = 'LOAD_MY_POST_REQUEST';
export const LOAD_MY_POST_SUCCESS = 'LOAD_MY_POST_SUCCESS';
export const LOAD_MY_POST_FAILURE = 'LOAD_MY_POST_FAILURE';
export const REMOVE_ALL_POST = 'REMOVE_ALL_POST';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch(action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostError = null;
        draft.addPostDone = true;
        console.log(action.data);
        draft.posts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = null;
        draft.addPostDone = true;
        break;
      case LOAD_MY_POST_REQUEST:
        draft.loadMyPostLoading = true;
        draft.loadMyPostError = null;
        draft.loadMyPostDone = false;
        break;
      case LOAD_MY_POST_SUCCESS:
        draft.loadMyPostLoading = false;
        draft.loadMyPostError = null;
        draft.loadMyPostDone = true;
        console.log(action.data);
        draft.posts = action.data;
        break;
      case LOAD_MY_POST_FAILURE:
        draft.loadMyPostLoading = false;
        draft.loadMyPostError = null;
        draft.loadMyPostDone = true;
        break;
      case REMOVE_ALL_POST:
        draft.posts = [];
        break;
      default:
        break;
    }
  })
}

export default reducer;