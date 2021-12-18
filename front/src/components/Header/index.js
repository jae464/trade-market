import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, {createGlobalStyle} from 'styled-components';
import { useNavigate } from "react-router";
import {BiSearch} from 'react-icons/bi';
import LoginModal from "../modals/LoginModal";
import useInput from "../../hooks/useInput";

const Header = () => {
	const navigate = useNavigate();
	const { logInDone } = useSelector((state) => state.user);
	const [word, onChangeWord, setWord] = useInput('');
	const [isLoginModal, setLoginModal] = useState(false);
	useEffect(() => {
		console.log('로그인 여부 : ', logInDone);
	}, [logInDone]);

	const gotoLogin = () => {
		// navigate('/login');
		setLoginModal(true);
	}
	const gotoMypage = () => {
		navigate('/mypage');
	}
	const gotoHome = () => {
		navigate('/');
	}
	const gotoChatRoom = () => {
		if(!logInDone) {
			alert('로그인이 필요합니다.');
		} else {
			navigate('/roomlist');
		}
	}
	const gotoSearchPage = useCallback((e) => {
		e.preventDefault();
		console.log(word);
		navigate(`/search/${word}`);
		setWord('');
	},[word]);
  return (
		<>
			<Wrapper>
				<Logo onClick={gotoHome}>Trade</Logo>
				<SearchWrapper onSubmit={gotoSearchPage}>
					<input 
						value={word}
						placeholder="원하는 상품명을 입력하세요."
						onChange={onChangeWord}
					/>
					<button htmlFor="submit"><BiSearch /></button>
				</SearchWrapper>
				<div className='roomlist' onClick={gotoChatRoom}>채팅방</div>
				{!logInDone 
				? <div className='login' onClick={gotoLogin}>로그인</div> 
				: <div className='mypage' onClick={gotoMypage}>마이페이지</div>}
				{ isLoginModal && <LoginModal modal={setLoginModal}/>}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	height: 100px;
	display: flex;
	align-items: center;
	font-weight: bold;
	// width: 1728px;
	width: 100%;
	justify-content: space-between;
	background: rgb(248, 249, 250);
	text-decoration: none;
	.login, .mypage, .roomlist {
		cursor: pointer;
		text-decoration: none;
		font-size: 1rem;
		margin-right: 2rem;
	}
	// @media (max-width: 1919px) {
	// 	width: 1376px;
	// }
	// @media (max-width: 1440px) {
	// 	width: 1024px;
	// }
	// @media (max-width: 1056px) {
	// 	width: calc(100% - 2rem);
	// }
`

const Logo = styled.span`
	font-size: 2rem;
	cursor: pointer;
	font-weight: bold;
	margin-left: 2rem;
	
`

const SearchWrapper = styled.form`
	font-size: 1.5rem;
	display: flex;
	align-items: center;
	input {
		width: 20rem;
		height: 2rem;
		margin-right: 1rem;
	}
	button {
		border: none;
		background: none;
		cursor: pointer;
		font-size: 1.5rem;
	}

`

export default Header;
