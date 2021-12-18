import axios from 'axios';
import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import { categories } from '../../constants/category';
import * as api from '../../api/post';
import { ADD_POST_REQUEST} from '../../reducers/post';

const PostForm = () => {
  const [title,onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [price, onChangePrice] = useInput('');
  const [imagePaths, setImagePaths] = useState([]);
  const [category, setCategory] = useState('elect');
  const [trade, setTrade] = useState(true);
  const [wantCategory, setWantCategory] = useState([]);

  const imageInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickImageUpload = useCallback((e) => {
    e.preventDefault();
    imageInput.current.click();
    console.log(e.target);
  }, [imageInput.current]);

  const onChangeImage = useCallback(async (e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    console.log(imageFormData);
    const result = await api.imageUploadAPI(imageFormData);
    console.log(result);
    if(!result) return;
    setImagePaths((prev) => {
      return [...prev, ...result];
    })
  }, []);

  const onChangeCategory = useCallback((e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  }, []);

  const onRemoveImage = useCallback((value) => (e) => {
    console.log(value);
    setImagePaths(imagePaths.filter((v,i)=>v !== value));
  }, [imagePaths]);

  const onGoBack = useCallback((e) => {
    e.preventDefault();
    navigate('/');
  }, []);

  const onSubmitForm = useCallback(async (e) => {
    e.preventDefault();
    console.log(title, content);
    if(title === '') {
      alert('제목을 입력해야합니다.');
      return;
    }
    if(content === '') {
      alert('상세내용을 입력해야합니다.');
      return;
    }
    if(imagePaths.length === 0) {
      alert('한개 이상의 이미지를 등록해야합니다.');
      return;
    }
    const formData = new FormData();
    imagePaths.forEach((i) => {
      formData.append('image', i);
    });
    wantCategory.forEach((i) => {
      formData.append('wantCategory', i);
    })
    formData.append('content', content);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('trade', trade);
    
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    })
    // const result = await api.addPostAPI(formData);
    // console.log(result);
    
    setTimeout(()=>{
      navigate('/');
    },300);
  },[title, content, imagePaths]);

  const onChangeTrade = useCallback((e)=>{
    if(e.target.value === 'true') {
      setTrade(true);
    } else {
      setTrade(false);
    }
  },[trade])

  const onChangeWantCategory = useCallback((value) => (e) => {
    console.log(e.target.checked)
    if(e.target.checked) {
      setWantCategory((prev)=>[value,...prev]);
    } else {
      setWantCategory(wantCategory.filter((v)=>v !== value));
    }
  })
  return (
    <>
      <button onClick={e => console.log(imagePaths)}>확인</button>
      <FormWrapper encType="multipart/form-data" onSubmit={onSubmitForm}>
        <TitleWrapper
          placeholder="제목을 입력하세요."
          value={title}
          onChange={onChangeTitle}
        >
        </TitleWrapper>
        <CategoryWrapper>
          <span className="category">
          종류
            <select
              name='category'
              value={category}
              onChange={onChangeCategory}
            >
              {categories.map((v) => <option value={v.value} label={v.label}></option>)}
            </select>
          </span>
          <span className="trade-available">교환 가능 여부</span>
          <input type="radio" name="trade" value='true' onChange={onChangeTrade}/><span> 가능  </span>
          <input type="radio" name="trade" value="false" onChange={onChangeTrade}/><span> 불가능</span>
        </CategoryWrapper>
        <CheckListWrapper>
          <span className="checkbox-title">원하는 물품 종류</span>
          {categories.map((v) => (
            <>
              <input 
                className="checkbox"
                type="checkbox"
                name={v.label}
                value={v.value}
                onChange={onChangeWantCategory(v.value)}
              />
              <span className="checkbox-option">{v.label}</span>
            </>
          ))}
        </CheckListWrapper>
        <PriceWrapper>
          <span>가격</span>
          <input
            placeholder="가격을 입력하세요"
            value={price}
            onChange={onChangePrice}
            required
          /> 원
        </PriceWrapper>
        <TextWrapper>
          <TextEditor
            placeholder="상세 설명을 입력하세요."
            value={content} 
            onChange={onChangeContent}>
            {content}
          </TextEditor>
        </TextWrapper>
        <ButtonWrapper>
          <ImageUploadWrapper>
            <input 
              type="file" 
              multiple hidden 
              ref={imageInput}
              onChange={onChangeImage} />
            <button className="img-upload" onClick={onClickImageUpload}>이미지 업로드</button>
          </ImageUploadWrapper>
          <button className="goback" onClick={onGoBack}>뒤로가기</button>
          <button className="submit" htmlFor="submit">제출하기</button>
        </ButtonWrapper>
        {/* <UploadedImages>
          {imagePaths.map((v, i) => (
            <div className="img_box">
              <div className="img_src">{v[i]}</div>
              <button onClick={onRemoveImage(i)}>제거</button>
            </div>
          ))}
        </UploadedImages> */}
        <PreviewWrapper>
          {imagePaths.map((v, u) => (
              <div className='img-preview'>
                <img src={`http://localhost:3070/${v}`} alt={v.src} />
                <button onClick={onRemoveImage(v)}>제거</button>
              </div>
          ))}
        </PreviewWrapper>
      </FormWrapper>
    </>
  )
}

const FormWrapper = styled.form`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
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

const TitleWrapper = styled.textarea`
  padding: 0px;
  font-size: 2.5rem;
  width: 100%;
  max-height: 65px;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  border-bottom: 1px solid rgb(233,236,239);
`
const CategoryWrapper = styled.div`
  font-weight: bold;
  margin-top: 1rem;
  select {
    width: 10%;
    height: 2rem;
    margin-left: 2rem;
  }
  .trade-available {
    margin-left: 6rem;
    margin-right: 2rem;
  }
`

const CheckListWrapper = styled.div`
  margin-top: 3rem;
  .checkbox-title {
    font-weight: bold;
    display: block;
    margin-bottom: 2rem;
  }
  .checkbox {
    margin-right: 0.5rem;
  }
  .checkbox-option {
    margin-right: 1rem;
  }
`
const TextWrapper = styled.div`
  width: 100%;
  height: 30vh;
`
const TextEditor = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  line-height: 1.5;
  outline: none;
  cursor: text;
  border-bottom: 1px solid rgb(233,236,239);
  margin-top: 1rem;
`
const PriceWrapper = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-top: 3rem;
  
  align-items: center;
  input {
    margin-left: 2rem;
    height: 2rem;
    margin-bottom: 1rem;
    text-align: right;
  }
  border-bottom: 1px solid rgb(233, 236, 239);
`
const PreviewWrapper = styled.div`
  height: 30vh;
  img {
    width: 300px;
    height: 300px;
    object-fit: contain;
  }
  .img-preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const ImageUploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  .img-upload {
    height: 35px;
    background: rgb(18, 184, 134);
    color: white;
    border: none;
    border-radius: 4px;
    // margin-top: 10px;
    cursor: pointer;
  }
`

const UploadedImages = styled.div`
  .img_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
  }
  button {
    height: 35px;
    // width: 4rem;
    background: rgb(241, 243, 245);
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  button {
    height: 35px;
    width: 6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .submit {
    margin-left: 10px;
    background: rgb(18,184,134);
    color: white;
  }


`
export default PostForm
