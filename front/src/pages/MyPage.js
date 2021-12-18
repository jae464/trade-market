import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../components/Header'
import ItemCard from '../components/ItemCard';
import UserProfile from '../components/UserProfile';
import { LOAD_MY_POST_REQUEST } from '../reducers/post';
import { LOAD_USER_INFO_REQUEST, LOG_OUT_REQUEST } from '../reducers/user';

const MyPage = () => {
  const dispatch = useDispatch();
  const {posts} = useSelector((state)=>state.post);
  const {me} = useSelector((state)=>state.user);
  const logout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    })
  }, []);

  useEffect(() => {
    if(me)  return;
		dispatch({
			type: LOAD_USER_INFO_REQUEST,
		});
	}, []);

  useEffect(() => {
    if (me?.id && posts.length === 0) {
      dispatch({
        type: LOAD_MY_POST_REQUEST,
        data: me.id,
      })
    }
  }, [me]);
  
  return (
    <>
      <Header />
      <button onClick={logout}>로그아웃</button>
      <button onClick={()=>{console.log(posts)}}>내 포스트 확인</button>
      <MainWrapper>
        <UserProfile />
        <h2>내 상점</h2>
        <PostList>
          {posts.map((v,i) => <ItemCard item={v} type='mypage' />)}
        </PostList>
        <button>더보기</button>
      </MainWrapper>
    </>
  )
}

const MainWrapper = styled.div`
  margin-top: 100px;
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  @media (max-width: 1919px) {
    width: 1376px;
  } 
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`

const PostList = styled.div`
  display: flex;
  margin: -1rem;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  // flex-direction: column;
`
export default MyPage
