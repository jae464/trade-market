import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getChatRoomsAPI } from '../../api/chatroom';
import { LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import RoomCard from '../RoomCard';
const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const dispatch = useDispatch();
  const {logInDone} = useSelector((state) => state.user);
  useEffect(() => {
		if(logInDone) return;
		dispatch({
			type: LOAD_USER_INFO_REQUEST,
		});
	}, []);
  useEffect(() => {
    console.log('roomlist page')
    getRooms();
    console.log(roomList);
  }, []);
  const getRooms = async () => {
    const result = await getChatRoomsAPI();
    console.log('roomdata', result);
    if(!result) return;
    setRoomList(result);
  }
  return (
    <>
      <RoomListWrapper>
        {roomList.map((room, idx) => <RoomCard roomInfo={room} />)}
      </RoomListWrapper>
    </>
  )
}

const RoomListWrapper = styled.div`

`
const RoomWrapper = styled.div`
 div {
   cursor: pointer;
   border: 1px solid black;
 }
`
export default RoomList;
