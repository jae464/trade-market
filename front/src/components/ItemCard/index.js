import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
	const navigate = useNavigate();
	const moveToDetail = useCallback(()=>{
		navigate(`/detail/${item.id}`);
	}, [])
  return (
    <>
      <CardWrapper onClick={moveToDetail}>
        <img src={item.Images[0].src} alt={item.Images[0].src} />
        <TitleWrapper>{item.title}</TitleWrapper>
        <PriceWrapper>{item.price}원</PriceWrapper>
      </CardWrapper>
    </>
  );
};

const CardWrapper = styled.div`
  width: 20rem;
  height: 30rem;
  margin: 1rem;
  // border: 1px solid black;
  display: flex;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  flex-direction: column;
  item-align: center;
  @media (max-width: 1056px) {
    width: calc(50% - 2rem);
  }
  @media (max-width: 767px) {
    margin: 1rem;
    width: 100%;
  }
  img {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }
`;
const TitleWrapper = styled.div`
  font-size: 1rem;
  overflow: hidden;
  margin-left: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  // word-break: break-word;
  // margin: 1rem;
  // line-height: 1.5;
  // height: 1rem;
`;

const PriceWrapper = styled.div`
  margin-left: 4px;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default ItemCard;
