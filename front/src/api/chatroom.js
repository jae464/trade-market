import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const getChatRoomsAPI = async (data) => {
  try {
    const result = await axios.get('/chatroom');
    return result.data;
  } catch (err) {
    toast.error('getChatrooms error');
  }
}

export const leaveChatRoomAPI = async (data) => {
  try {
    const result = await axios.patch(`/chatroom/${data}`);
    return result.data;
  } catch (err) {
    toast.error('leaveChatRooms error');
  }
}

export const getChatUserAPI = async (roomId, userId) => {
  try {
    const result = await axios.get(`/chatroom/${roomId}/${userId}`);
    return result.data;
  } catch(err) {
    toast.error('getChatUser error');
  }
}