import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import Header from '../components/Header'
import { LOG_OUT_REQUEST } from '../reducers/user';

const MyPage = () => {
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, []);
  return (
    <>
      <Header />
      <button onClick={logout}>로그아웃</button>
    </>
  )
}

export default MyPage
