import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const loadAllPostsAPI = async () => {
  try {
    const result = await axios.get('/posts');
    return result.data;
  } catch (err) {
    toast.error('loadposts error');
  }
}

export const loadMyPostsAPI = async(data) => {
  try {
    const result = await axios.get(`/posts/${data}`);
    return result.data;
  } catch (err) {
    toast.error('내 게시글을 불러오는데 실패했습니다.');
  }
}

export const searchPostAPI = async (data) => {
  try {
    const result = await axios.get(`/posts/search/${data}`);
    return result.data;
  } catch (err) {
    toast.error('게시글 검색에 실패했습니다.')
  }
}

