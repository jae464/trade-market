import { useCallback } from "react";
import {io} from 'socket.io-client';

const useSocket = () => {
  const socket = io.connect('http://localhost:3070', {
    path: '/socket.io',
    transports: ['websocket'],
  });
  return socket;
};

export default useSocket;