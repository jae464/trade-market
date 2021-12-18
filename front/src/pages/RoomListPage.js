import React,{useEffect} from 'react'
import Header from '../components/Header';
import styled from 'styled-components';


import RoomList from '../components/RoomList';
import { useDispatch } from 'react-redux';
import { LOAD_USER_INFO_REQUEST } from '../reducers/user';

const RoomListPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch({
			type: LOAD_USER_INFO_REQUEST,
		});
	}, []);
  return (
    <>
      <Header/>
      <RoomList />
    </>
  )
}

export default RoomListPage;
