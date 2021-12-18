import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from "react-router";

const RoomCard = ({roomInfo}) => {
  const {me} = useSelector((state) => state.user);
  const [you,setYou] = useState(null);
  const [type, setType] = useState('');
  const navigate = useNavigate();

  const goToChatPage = () => {
    navigate(`/chat/${roomInfo.id}/${me.id}/${you.id}`);
  }
  useEffect(() => {
    console.log('roomcard', roomInfo);
    console.log(me);
    setYou(roomInfo.BuyerId === me.id ? roomInfo.Seller : roomInfo.Buyer);
  }, []);
  useEffect(() => {
    if(!roomInfo.BuyerPost) {
      setType('buy');
    }
    else {
      setType('trade');
    }
  }, []);
  return (
    <>
      <Room onClick={goToChatPage} type={type}>
        <BuyerWrapper>
          <div className='myname'>{roomInfo.Buyer && roomInfo.Buyer.nickname}</div>
          {roomInfo.BuyerPost && <img src={`http://localhost:3070/${roomInfo.BuyerPost?.Images[0].src}`} 
          alt={`http://localhost:3070/${roomInfo.BuyerPost?.Images[0].src}`}/>}
        </BuyerWrapper>
        <ContentWrapper>
          {roomInfo.title}
        </ContentWrapper>
        <SellerWrapper>
          <div className='myname'>{roomInfo.Seller && roomInfo.Seller.nickname}</div>
          {roomInfo.SellerPost && <img src={`http://localhost:3070/${roomInfo.SellerPost?.Images[0].src}`} 
          alt={`http://localhost:3070/${roomInfo.SellerPost?.Images[0].src}`}/>}
        </SellerWrapper>
      </Room>
    </>
  )
}

const Room = styled.div`
  width: 30rem;
  height: 6rem;
  // border: 1px solid black;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  background: ${({type}) => (type === 'buy' ? '#7fffd4' : '#ffe4c4 ')};
   
`
const BuyerWrapper = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 1rem;
  align-items: center;
  font-weight: bold;
  img {
    width: 80%;
    height: 60%;
  }
`

const ContentWrapper = styled.div`
  width: 60%;
  height: 100%;
  text-align: center;
  font-weight: bold;
`

const SellerWrapper = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  align-items: center;
  font-weight: bold;
  img {
    width: 80%;
    height: 60%;
  }
`
export default RoomCard
