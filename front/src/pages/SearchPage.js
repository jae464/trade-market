import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router";
import styled from 'styled-components';

import { searchPostAPI } from '../api/posts';
import Header from '../components/Header';
import ItemCard from '../components/ItemCard';
const SearchPage = () => {
  const params = useParams();
  const [posts,setPosts] = useState([]);
  
  useEffect(() => {
    getSearchedPosts(params.searchWord);
  }, [params.searchWord]);
  const getSearchedPosts = async (data) => {
    const result = await searchPostAPI(data);
    setPosts(result);
  }
  return (
    <div>
      <Header />
      <Title>총 {posts.length} 개의 검색 결과가 있습니다.</Title>
      <MainWrapper>
				<ItemList>
					{posts.map((item, idx) => (
						<ItemCard item={item}/>
					))}
				</ItemList>
			</MainWrapper>
    </div>
  )
}
const Title = styled.h3`
  margin-left: 6rem;
  margin-top :6rem;
  color: grey;
`
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
export default SearchPage
