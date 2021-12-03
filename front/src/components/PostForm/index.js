import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const PostForm = () => {
  const [title,onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [imglist, setImglist] = useState([]);
  const imageInput = useRef();
  const onClickImageUpload = useCallback((e) => {
    imageInput.current.click();
    console.log(e.target);
  }, [imageInput.current]);

  const onChangeImage = useCallback((e) => {
    console.log(e.target.value);
    setImglist((prev) => [...prev,e.target.value]);
  }, [])
  return (
    <>
      <FormWrapper>
        <TitleWrapper
          placeholder="제목을 입력하세요."
          value={title}
          onChange={onChangeTitle}
        >
        </TitleWrapper>
        <TextWrapper>
          <TextEditor
            placeholder="상세 설명을 입력하세요."
            value={content} 
            onChange={onChangeContent}>
            {content}
          </TextEditor>
        </TextWrapper>
        <ImageUploadWrapper>
          <input 
            type="file" 
            multiple hidden 
            ref={imageInput}
            onChange={onChangeImage} />
          <button onClick={onClickImageUpload}>이미지 업로드</button>
        </ImageUploadWrapper>

      </FormWrapper>
    </>
  )
}

const FormWrapper = styled.div`
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
const TextWrapper = styled.div`
  width: 100%;
  height: 60vh;
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
`

const ImageUploadWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
`

const UploadedImages = styled.div`

`
export default PostForm
