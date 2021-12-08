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

