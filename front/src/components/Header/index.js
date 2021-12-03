import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled, {createGlobalStyle} from 'styled-components';
import { useNavigate } from "react-router";

import LoginModal from "../modals/LoginModal";

const Header = () => {
	const navigate = useNavigate();
	const { logInDone } = useSelector((state) => state.user);
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
  return (
		<>
			<Wrapper>
				<Logo onClick={gotoHome}>Trade</Logo>
				<div>물건목록</div>
				<div>검색창</div>
				{!logInDone 
				? <div className='login' onClick={gotoLogin}>로그인</div> 
				: <div className='mypage' onClick={gotoMypage}>마이페이지</div>}
				{ isLoginModal && <LoginModal modal={setLoginModal}/>}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	height: 80px;
	display: flex;
	align-items: center;
	// width: 1728px;
	width: 100%;
	justify-content: space-between;
	background: rgb(248, 249, 250);
	text-decoration: none;
	.login, .mypage {
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

export default Header;
