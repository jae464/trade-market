import React, { useCallback } from 'react'
import styled from 'styled-components';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from '../../../hooks/useInput';
import { LOG_IN_REQUEST } from '../../../reducers/user';

const LoginModal = ({modal}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email,onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log('제출 완료');
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: {email, password}
    })
    navigate('/');
    modal(false);
  }, [email, password]);
  const closeModal = useCallback(() => {
    modal(false);
  }, []);
  return (
    <>
      <Container>
        <LoginBox>
          <div className="exit" onClick={closeModal}>X</div>
          <h2>로그인</h2>
          <FormWrapper onSubmit={onSubmitForm}>
            <input placeholder="아이디" value={email} onChange={onChangeEmail}/>
            <input placeholder="비밀번호" value={password} onChange={onChangePassword}
              type="password"/>
            <button className="loginBtn" htmlFor="submit">로그인</button>
          </FormWrapper>
          <SignWrapper>
            아직 회원이 아니신가요?
            <Link to="/signup">
              <span className="sign">회원가입</span>
              </Link>
          </SignWrapper>
        </LoginBox>
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
const LoginBox = styled.div`
  width: 25rem;
  height: 30rem;
  background: white;
  position: relative;
  box-sizing: border-box;
  box-shadow: rgb(0 0 0 / 9%);
  margin: 100px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  h2 {
    margin-top: 30px;
    margin-left: 20px;
  }
  .exit {
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
    cursor: pointer;
  }
`

const FormWrapper = styled.form`
  padding: 10px;
  display: flex;
  flex-direction: column;
  input {
    margin-bottom: 20px;
    height: 30px;
    font-size: 15px;
    width: 300px;
    border-radius: 4px;
    border: 1px solid #e5e5e5;
    padding: 6px;
  }
  .loginBtn {
    height: 35px;
    background: black;
    color: white;
    border: none;
    border-radius: 2px;
  }
`

const SignWrapper = styled.div`
  display: flex;
  font-size: 15px;
  padding: 10px;
  .sign {
    color: green;
    margin-left: 10px;
  }
  a {
    text-decoration: none;
  }

`
export default LoginModal
