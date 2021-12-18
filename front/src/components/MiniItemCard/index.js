import React, { useCallback } from 'react'
import styled from 'styled-components';
import { requestTradeAPI } from '../../api/trade';

const MiniItemCard = ({item, postId}) => {
  const onRequestTrade = useCallback(async () => {
    const result = await requestTradeAPI(postId, item.id);
    if(!result) return;
    console.log('교환요청결과', result);
  }, []);
  return (
    <>
      <CardWrapper onClick={onRequestTrade}>
        <img src={`http://localhost:3070/${item.Images[0].src}`}/>
        <span>{item.title}</span>
      </CardWrapper>
    </>
  )
}

const CardWrapper = styled.div`
  width: 100%;
  height: 4rem;
  // border: 1px solid black;
  display: flex;
  align-items: center;
  cursor: pointer;
  img {
    width: 20%;
    height: 100%;
    object-fit: cover;
  }
  span {
    font-size: 1.3rem;
    margin-left: 1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    
  }
  margin-bottom: 1rem;
  
`
export default MiniItemCard;
