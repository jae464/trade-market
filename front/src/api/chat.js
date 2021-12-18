import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const addChatAPI = async (data) => {
  try {
    const result = await axios.post('/chat', data);
    console.log(result.data);
    return result.data;
  } catch (err) {
    toast.error('채팅을 추가하는데 실패했습니다.');

  }
};

export const getChatAPI = async (data) => {
  try {
    const result = await axios.get(`/chat/${data}`);
    console.log(result.data);
    return result.data;
  } catch (err) {
    toast.error('채팅 내역을 불러오는데 실패했습니다.');
  }
}

