import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const imageUploadAPI = async (data) => {
  try {
    const result = await axios.post('/post/images', data);
    console.log(result.data);
    return result.data;
  } catch (err) {
    toast.error(err);
    return err;
  }
}

export const addPostAPI = async (data) => {
  try {
    const result = await axios.post('/post', data);
    console.log(result.data);
    return result.data;
  } catch (err) {
    toast.error(err);
    return err;
  }
}

export const getPostAPI = async (data) => {
  try {
    const result = await axios.get(`/post/${data}`);
    // console.log('getPostAPI 결과', result.data);
    return result.data;
  } catch(err) {
    toast.error('게시글을 불러오는데 실패했습니다.');

  }
}

export const deletePostAPI = async (data) => {
  try {
    const result = await axios.delete(`/post/${data}`);
    return result.data;
  } catch(err) {
    toast.error('게시글 삭제에 실패했습니다.');
    
  }
}