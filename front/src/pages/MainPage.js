import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router";

import Header from "../components/Header";
import {itemDummy, generateDummyItem} from '../components/data/itemDummy';
import ItemCard from '../components/ItemCard';

const MainPage = () => {
	const navigate = useNavigate();
	const [items, setItems] = useState([]);
	const getData =  () => {
		const dummyItems =  generateDummyItem(20);
		setItems([...dummyItems]);
		//console.log(items);
	};
	useEffect(() => {
		getData();
		console.log(items);
	}, []);

	const gotoPostpage = () => {
		navigate('/post');
	}
  return (
		<>
			<Header />
			<button onClick={gotoPostpage}>새 상품 등록</button>
			<MainWrapper>
				<ItemList>
					{items.map((item, idx) => (
						<ItemCard item={item}/>
					))}
				</ItemList>
			</MainWrapper>
		</>

  );
};

const MainWrapper = styled.div`
	margin-top: 100px;
	width: 1728px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
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

const ItemList = styled.div`
	display: flex;
	margin: -1rem;
	flex-wrap: wrap;
`

const LoginForm = styled.div`

`
export default MainPage;
