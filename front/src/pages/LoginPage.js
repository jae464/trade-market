import React,{useState} from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';
import { LOAD_MY_POST_REQUEST } from '../reducers/post';
const LoginPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');


  const onSubmint = (e) => {
    // e.preventDefault();
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: {email, password}
    });
    navigate('/');
  }

  return (
    <div>
      <form onSubmit={onSubmint}>
        <label htmlFor="user-email">이메일</label>
        <br />
        <input value={email} onChange={setEmail} required/>
        <br />
        <label htmlFor="user-password">패스워드</label>
        <br />
        <input value={password} onChange={setPassword} required/>
        <br />
        <button type="submit">가입하기</button>
      </form>
    </div>
  )
}


export default LoginPage
