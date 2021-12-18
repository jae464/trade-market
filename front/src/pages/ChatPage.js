import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {io, Socket} from 'socket.io-client';
import { useParams, useNavigate } from "react-router";
import useInput from '../hooks/useInput';
import styled from 'styled-components';
import Header from '../components/Header';
import * as api from '../api/chat';
import * as userAPI from '../api/user';
import { useSelector } from 'react-redux';
import { getChatUserAPI, leaveChatRoomAPI } from '../api/chatroom';


const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [chat, onChangeChat, setChat] = useInput('');
  const [socket, setSocket] = useState(null);
  const {me} = useSelector((state) => state.user);
  const [you, setYou] = useState(null);
  const [alone, setAlone] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
 
  const getChatData = async (data) => {
    const result = await api.getChatAPI(data);
    console.log('getChatData', result);
    if(!result) return;
    setChats((prev) =>[...result]);
  }
  const getYouData = async (data) => {
    const result = await userAPI.getUserInfo(params.yourid);
    console.log('your data', result);
    setYou(result);
  }
  useEffect(() => {
    setSocket(io.connect('http://localhost:3070', {
      path: '/socket.io',
      transports: ['websocket'],
    }));
  }, []);

  useEffect(() => {
    if(!socket) return;
    socket.emit('room',params.roomId);
    socket.on('chat',(data) => {
      console.log(data);
      setChats((prev) => [...prev,data]);
    });
    socket.on('exit',() => {
      getOtherUser();
    })
    return () => {
      console.log('소켓 종료해야됨.');
      socket.disconnect();
    }
  }, [socket]);

  // 채팅 내역 가져오기
  useEffect(() => {
    getChatData(params.roomId);
    console.log(chats);
    getYouData();
    console.log('your data: ',you);
    getOtherUser();
  }, []);

  const sendChat = useCallback(async (e) => {
    e.preventDefault();
    // 먼저 db에 chat 내역 저장하고, 그 다음에 socket에 전송(router에서 보내기로함)
    const data = {
      senderId: params.myid,
      receiverId: params.yourid,
      roomId: params.roomId,
      content: chat,
    }
    await api.addChatAPI(data);
    setChat('');
    console.log('socket으로 메시지 전달');
    // socket.emit('chat', data,params.roomId);
  }, [chat]);

  const leaveRoom = useCallback(async (e) => {
    const result = await leaveChatRoomAPI(params.roomId);
    if(!result) return;
    console.log(result);
    socket.emit('exit',params.roomId);
    navigate(-1);
  });

  const getOtherUser = useCallback(async (e) => {
    const result = await getChatUserAPI(params.roomId, params.yourid);
    if(!result) {
      setAlone(true);
    }
    console.log(result);
  })
  
  return (
    <>
      <Header />
      <button onClick={() => {console.log(chats)}}>확인용버튼</button>
      <ChatContainer>
        <ChatBox>
          {chats.map((v,i) => 
            <div className={parseInt(v.SenderId, 10) === me.id ? 'me' : 'you'}>
              <div className="nickname">{me.id === parseInt(v.SenderId,10) ? '나': you?.nickname}</div>
              {v.content}
            </div>)}
        </ChatBox>
        {alone ? <div>상대방이 퇴장했습니다.</div> :
          <InputBox onSubmit={sendChat}>
            <input type="text" value={chat} placeholder='메시지를 입력하세요.' onChange={onChangeChat}/>
            <button onClick={sendChat}>전송</button>
        </InputBox>}
        <button onClick={leaveRoom}>방나가기</button>
      </ChatContainer>
      
    </>
  )
}

const ChatContainer = styled.div`
  margin-left:auto;
  margin-right: auto;
  width: 400px;
  height: 600px;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  // border: 1px solid black;
  background-color: rgba(249, 249, 249, 0.85);
`
const ChatBox = styled.div`
  width: 100%;
  height: 500px;
  overflow-y: auto;
  .nickname {
    color: blue;
    font-size: 1rem;
  }
  .me {
    font-weight: bold;
    text-align: right;
    margin-bottom: 1rem;
    margin-right: 1rem;
  }
  .you {
    font-color: blue;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
`

const InputBox = styled.form`
  display: flex;
  width: 100%;
  input {
    width: 100%;
    height: 60px;
  }
`
export default ChatPage
