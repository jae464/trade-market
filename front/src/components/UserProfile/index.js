import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
const UserProfile = () => {
  const { me } = useSelector((state) => state.user);
  console.log(me);
  return (
    <>
      <UserCardWrapper>
        <ProfileImage>
          
        </ProfileImage>
        <ProfileInfo>
          {me?.nickname} 님의 상점입니다.
        </ProfileInfo>
      </UserCardWrapper>
    </>
  )
}

const UserCardWrapper = styled.div`
  width: 800px;
  height: 300px;
  border: 1px solid black;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`
const ProfileImage = styled.div`
  width: 300px;
  height: 100%;
  border: 1px solid black;
`

const ProfileInfo = styled.div`
  margin-left: 2rem;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: bold;
`
export default UserProfile;
