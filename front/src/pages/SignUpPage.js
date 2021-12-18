import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import { useNavigate } from 'react-router';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import { locations } from '../constants/location';
const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [location, onChangeLocation] = useInput('seoul');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(password !== passwordCheck) {
      return setPasswordError(true);
    }
    console.log(email, password, nickname, location);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {email, password, nickname, location},
    });
    navigate('/');
  },[email, password, nickname, location, passwordCheck, navigate])
  return (
    <>
      <Header />
      <Wrapper>
        <h2>회원가입</h2>
        <FormWrapper onSubmit={onSubmit}>
          <label htmlFor="user-email">이메일</label>
          <input
            placeholder="이메일을 입력하세요"
            type="email"
            value={email}
            required
            onChange={onChangeEmail}
          />
          <span>   중복체크</span>
          <br />
          <label htmlFor="user-password">비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            required
            onChange={onChangePassword}
          />
          <br />
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <input
            type="password"
            placeholder="비밀번호를 다시 한번 입력하세요"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && (<div>비밀번호가 일치하지 않습니다.</div>)}
          <br />
          <label htmlFor="user-nickname">닉네임</label>
          <input
            placeholder="닉네임을 입력하세요."
            value={nickname}
            required
            onChange={onChangeNickname}
          />
          <br />
          <label htmlFor="user-location">거주지역</label>
          <select
            name="location"
            value={location}
            onChange={onChangeLocation}  
          >
            {locations.map((v) => (
              <option value={v.value}>{v.label}</option>
            ))}
          </select>
          <button htmlFor="submit">가입조지기</button>
          <button>취소조지기</button>
        </FormWrapper>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  margin-top: 100px;
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  @media (max-width: 1919px) {
    width: 1376px;
  } 
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
  // border: 1px solid red;
  background: rgb(248, 249, 250);
`

const FormWrapper = styled.form`
  // width: 600px;
  width: 60%;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  // display: flex;
  // flex-direction: column;
  background-color: rgb(248,249,250);
  label {
    font-weight: bold;
    margin-top: 20px;
    display: block;
  }
  input {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 6px;
    // margin-right: auto;
    margin-top: 10px;
  }
  select {
    height: 30px;
    width: 100%;
  }
  button {
    width: 45%;
    height: 35px;
    background: black;
    color: white;
    border: none;
    border-radius: 2px;
    margin-top: 20px;
    margin-bottom:20px;
    margin-left: 10px;
  }
  // border: 1px solid black;
`
export default SignUpPage
