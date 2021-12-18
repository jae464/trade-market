import React, { useEffect,useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import styled from "styled-components";
import {FcPrevious, FcNext} from 'react-icons/fc';
import * as api from "../api/post";
import Header from "../components/Header";
import BuyModal from "../components/modals/BuyModal";
import DeleteModal from "../components/modals/DeleteModal";
import TradeModal from "../components/modals/TradeModal";
import { getLabel } from "../constants/category";
import { getLocationLabel } from "../constants/location";
import { LOAD_USER_INFO_REQUEST } from "../reducers/user";
const DetailPage = ({ postid }) => {
  const params = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState('');
	const [image, setImage] = useState(0); // 현재 이미지 인덱스
	const [isDeleteModal, setDeleteModal] = useState(false);
	const [isTradeModal, setTradeModal] = useState(false);
	const [isBuyModal, setBuyModal] = useState(false);
	const {me} = useSelector((state) => state.user);
	const dispatch = useDispatch();

  const getPost = async () => {
    const result = await api.getPostAPI(params.postId);
    console.log(result);
		if(!result) return;
		setPost(result);
		console.log(post);
  };
  useEffect(() => {
		console.log('렌더링')
    getPost();
		console.log(me);
  }, []);
	useEffect(() => {
		dispatch({
			type: LOAD_USER_INFO_REQUEST,
		});
	}, []);
	const displayPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	}

	const showPrevImage = useCallback(() => {
		console.log(post);
		setImage((prev) => prev - 1 >= 0 ? prev - 1 : post.Images.length - 1);
	}, [post, image]);

	const showNextImage = useCallback(() => {
		setImage((prev) => (prev + 1) % post.Images.length);
	}, [post, image]);

	const deletePost = useCallback(() => {
		setDeleteModal((prev) => !prev);
	}, []);

	const tradeRequest = useCallback(() => {
		setTradeModal((prev) => !prev);
	},[]);

	const buyRequest = useCallback(() => {
		setBuyModal((prev) => !prev);
	})
  return (
    <>
      <Header />
			<button onClick={()=>console.log(image)}>확인용 버튼</button>
			<MainWrapper>
				<CardWrapper>
					<ImageWrapper>
						{post.Images && <img src={`http://localhost:3070/${post.Images[image].src}`} />}
						{/* <button className='nextBtn'>{'<'}</button> */}
						<ImageButtonWrapper>
							<FcPrevious className="img_prev" onClick={showPrevImage} />
							<FcNext className="img_next" onClick={showNextImage} />
						</ImageButtonWrapper>
					</ImageWrapper>
					<ItemWrapper>
						<TitleWrapper>
							{post.title}
						</TitleWrapper>
						<PriceWrapper>
							{post.price && displayPrice(post.price)}원
						</PriceWrapper>
						<CategoryWrapper>
							<span className="category">카테고리</span>
							<span>{post && getLabel(post.Category.category)}</span>
						</CategoryWrapper>
						<TradeWrapper>
							<span className="trade-available">교환 여부</span>
							{post.trade ? <span>교환가능</span> : <span>교환 불가능</span>}
						</TradeWrapper>
						{post.trade ? (
							<TradeListWrapper>
								<div style={{color: "rgb(153, 153, 153)"}}>교환 가능 종류</div>
								<br />
								{post.WantCategorys.map((v) => (<span className='trade-category'>{getLabel(v.category)}</span>))}
							</TradeListWrapper>	
						):null}
						<LocationWrapper>
							<span className='location'>거래지역</span>
							<span className='user-location'>{post && getLocationLabel(post.User.location)}</span>
						</LocationWrapper>
						<AuthorInfo>
							<span className="author">판매자</span>
							<span className="author-nickname">{post && post.User.nickname}</span>
						</AuthorInfo>
						<ButtonWrapper>
							{post && post.UserId === me?.id 
								? <button className='edit'>편집</button> 
								: <button className='buy' onClick={buyRequest}>구매요청</button>}
							{isBuyModal && <BuyModal setModal={setBuyModal} post={post} />}
							{post && post.UserId === me?.id 
								? <button onClick={deletePost}>삭제</button>
								:<button className='trade' onClick={tradeRequest}>교환요청</button>}
							{isDeleteModal && <DeleteModal setModal={setDeleteModal} postId={post.id} />}
							{isTradeModal && <TradeModal setModal={setTradeModal} post={post} />}
						</ButtonWrapper>
					</ItemWrapper>
				</CardWrapper>
				<ContentWrapper>
					<div>상세 설명</div>
					{post && post.content}
				</ContentWrapper>
			</MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
	width: 1728px;
	margin-left: auto;
	margin-right: auto;
	@media (max-width: 1919px) {
		width: 1376px;
	} 
	@media (max-width: 1440px) {
		width: 1024px;
	}
	@media (max-width: 1056px) {
		width: calc(100% - 2rem);
	}
`;
const CardWrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	align-items: center;
`;
const ImageWrapper = styled.div`
	margin-right: 2rem;
	width: 600px;
	height: 400px;
	justify-content: flex-end;
	img {
		width: 100%;
		height: 80%;
		object-fit: contain;
	}
`
const AuthorInfo = styled.div`
	margin-top: 2rem;
	.author {
		margin-right: 1rem;
		font-size: 1rem;
		color: rgb(153, 153, 153);
	}
`
const ImageButtonWrapper = styled.div`
	width:100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 1rem;
	.img_prev {
		margin-right: 2rem;
		font-size: 1.5rem;
		cursor: pointer;
	}
	.img_next {
		margin-left: 2rem;
		font-size: 1.5rem;
		cursor:pointer;
	}
	
`
const ItemWrapper = styled.div`
 margin-left: 2rem;
 width: 100%;
 
`
const TitleWrapper = styled.div`
	font-size: 2rem;
	font-weight: bold;
	padding-bottom: 1rem;
	border-bottom: 1px solid #e5e5e5;
	width: 100%;
`
const PriceWrapper = styled.div`
	font-size: 2rem;
	font-weight: bold;
	margin-bottom: 1rem;
	margin-top: 1rem;
`

const CategoryWrapper = styled.div`
 .category {
	 margin-right: 1rem;
	 font-size: 1rem;
	 color: rgb(153, 153, 153);
 }
 margin-bottom: 2rem;
`
const TradeWrapper = styled.div`
	font-size: 1rem;
	font-weight: bold;
	.trade-available {
		margin-right: 1rem;
		font-weight: lighter;
		font-size: 1rem;
		color: rgb(153, 153, 153);
	}
	
`
const TradeListWrapper = styled.div`
	margin-top: 2rem;
	.trade-category {
		padding: 1rem;
	}
`

const LocationWrapper = styled.div`
	margin-top: 2rem;
	.location {
		margin-right: 1rem;
		color: rgb(153, 153, 153);
	}
	.user-location {
		font-weight: bold;
	}
`
const ButtonWrapper = styled.div`
	margin-top: 2rem;
	// right: 0px;
	display: flex;
	justify-content: flex-end;
	margin-right: 4rem;
	button {
		width: 8rem;
		height: 3rem;
		font-size: 1rem;
		background-color: #00c471;
		color: white;
		border: none;
		cursor: pointer;
	}
	.buy, .edit {
		margin-right: 1rem;
	}
	
`
const ContentWrapper = styled.div`
	div {
		font-weight: bold;
		font-size: 2rem;
		margin-bottom: 2rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #e5e5e5;
	}
`
export default DetailPage;
