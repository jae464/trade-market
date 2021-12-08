import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getLocationLabel } from "../../constants/location";

const ItemCard = ({ item }) => {
	const navigate = useNavigate();
	const moveToDetail = useCallback((e)=>{
    e.preventDefault();
		navigate(`/detail/${item?.id}`);
	}, []);
  useEffect(() => {
    console.log(item);
  },[]);
  const displayPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	}
  return (
    <>
      <CardWrapper onClick={moveToDetail}>
        {item.Images && item.Images[0]
          ? (
            <img src={`http://localhost:3070/${item.Images[0].src}`} alt={`http://localhost:3070/${item.Images[0].src}`} />
          )
          : null
        }
        {/* <img src={`http://localhost:3070/${item.Images[0].src}`} alt={`http://localhost:3070/${item.Images[0].src}`} /> */}
        <TitleWrapper>{item.title}</TitleWrapper>
        <PriceWrapper>{displayPrice(item.price)}원</PriceWrapper>
        {getLocationLabel(item.User.location)}
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
