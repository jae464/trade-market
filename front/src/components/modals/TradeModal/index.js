import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MiniItemCard from '../../MiniItemCard';
const TradeModal = ({post, setModal}) => {
  const {posts} = useSelector((state) => state.post);
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    console.log('나의 포스트 리스트', posts);
    console.log(post);
    // 해당 게시글의 원하는 카테고리들과 나의 게시글의 카테고리가 같은 나의 게시글들을 보여준다.
    const wantCategoryId = post.WantCategorys.map((v,i) => v.id);
    console.log(wantCategoryId);
    const availablePosts = posts.filter((v, i) => wantCategoryId.includes(v.CategoryId));
    console.log(availablePosts);
    setPostList(availablePosts);
  }, []);

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);
  return (
    <>
      <Container>
        <button onClick={closeModal}>모달닫기</button>
        <PostList>
          <h2>교환 가능 리스트!!</h2>
          {postList.map((v,i) => <MiniItemCard item={v} postId={post.id}/>)}
        </PostList>
      </Container>
    </>
  )
}
const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  z-index: 10;
`

const PostList = styled.div`
  position: relative;
  width: 25rem;
  height: 30rem;
  overflow-y: auto;
  background: white;
  position: relative;
  margin: 100px auto;
  padding: 10px;
`
export default TradeModal;
