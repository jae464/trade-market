import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const getUserInfo = async (data) => {
  try {
    const result = await axios.get(`/user/${data}`);
    console.log('받아온 유저 데이터 : ', result.data);
    return result.data;
  } catch (err) {
    toast.error('유저 정보를 불러오는데 실패했습니다.');
  }
}