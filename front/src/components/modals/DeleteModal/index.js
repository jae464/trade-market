import axios from "axios";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as api from '../../../api/post'
import styled from "styled-components";

const DeleteModal = ({setModal, postId}) => {
  const navigate = useNavigate();
  const onCancel = () => {
    setModal(false);
  }

  const onConfirm = async () => {
    const result = await api.deletePostAPI(postId);
    if(!result) return;
    alert('성공적으로 삭제되었습니다.');
    navigate("/");
  }
  
  return (
    <>
      <Container>
        <div className="sub-container">
          <DeleteBox>
            <h3>포스트 삭제</h3>
            <div className="message">정말로 삭제하시겠습니까?</div>
            <div className="button-area">
              <button className="cancel" onClick={onCancel}>취소</button>
              <button className="confirm" onClick={onConfirm}>확인</button>
            </div>
          </DeleteBox>
        </div>
        
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(249, 249, 249, 0.85);
  z-index: 10;
  .sub-container {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
`

const DeleteBox = styled.div`
  width: 25rem;
  border-radius: 4px;
  background: white;
  padding: 2rem, 1.5rem;
  box-shadow: rgb(0 0 0 / 9%);

  h3 {
    margin: 1rem;
    font-size: 1.5rem;
    color: rgb(52, 58, 64);
    line-height: 1.5;
    font-weight: bold;
  }
  .message {
    line-height: 1.5;
    font-size: 1rem;
    color: rgb(73, 80, 87);
    margin-top: 1rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
  .button-area {
    margin-top: 2rem;
    margin-bottom: 2rem;
    margin-right: 2rem;
    display: flex;
    -webkit-box-pack: end;
    justify-content: flex-end;
    
  }
  .cancel {
    display: inline-flex;
    background: rgb(233,236,239);
    color: rgb(73,80,87);
    padding: 0px 1.25rem;
    height: 2rem;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    align-items: center;
  }

  .confirm {
    display: inline-flex;
    margin-left: 2rem;
    background: rgb(18,184,134);
    color: rgb(73,80,87);
    padding: 0px 1.25rem;
    height: 2rem;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    align-items: center;
  }
`

export default DeleteModal;
