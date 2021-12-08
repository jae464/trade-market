import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router";

import Header from "../components/Header";
import {itemDummy, generateDummyItem} from '../components/data/itemDummy';
import ItemCard from '../components/ItemCard';
import { useDispatch, useSelector } from "react-redux";
import { LOAD_USER_INFO_REQUEST } from "../reducers/user";
import { loadAllPostsAPI } from "../api/posts";
import { toast } from "react-toastify";

const MainPage = () => {
	const navigate = useNavigate();
	const [items, setItems] = useState([]);
	const {logInDone} = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const getData =  async () => {
		const result = await loadAllPostsAPI();
		console.log('getData', result);
		if(!result) return;
		setItems((prev) => [...result, ...prev]);
	};
	useEffect(() => {
		getData();
		console.log(items);
	}, []);
	useEffect(() => {
		dispatch({
			type: LOAD_USER_INFO_REQUEST,
		})
	}, []);
	const gotoPostpage = () => {
		if (logInDone) {
			navigate('/post');
		} else {
			alert('로그인이 필요합니다.');
		}
	}
  return (
		<>
			<Header />
			<button onClick={(e)=>console.log(items)}></button>
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
