import axios from 'axios';
import {toast} from 'react-toastify';
axios.defaults.baseURL = 'http://localhost:3070';
axios.defaults.withCredentials = true;

export const requestTradeAPI = async (data, mypostId) => {
  try {
    const result = await axios.post(`/trade/${data}?mypostId=${mypostId}`);
    return result.data;
  } catch (err) {
    toast.error('tradeRequest error');
  }
}

