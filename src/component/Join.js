import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcCheckmark } from "react-icons/fc";

export default function Join() {
  const [passCheck, setPassCheck] = useState();
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const [idFlag, setIdFlag] = useState(false);

  const postMember = async (e) => {
    e.preventDefault();
    if (nameRef.current.value === '') {
      alert('이름을 입력하세요.')
      nameRef.current.focus();
      return;
    }
    if (idRef.current.value === '') {
      alert('아이디를 입력하세요.')
      idRef.current.focus();
      return;
    }
    if (passRef.current.value === '') {
      alert('비밀번호를 입력하세요.')
      passRef.current.focus();
      return;
    }
    if (idFlag === false) {
      alert('아이디 중복검사 하세요')
      return;
    }
    if (!passCheck) {
      alert('비밀번호가 일치하지 않습니다')
      pass2Ref.current.focus();
      return;
    }

    try {
        const resp = await fetch('http://10.125.121.219:8080/board', {
            method:'POST', 
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer abcd'
            },
            body:JSON.stringify({
                'name' : nameRef.current.value,
                'userid' : idRef.current.value,
                'password' : passRef.current.value
            })
        });
        if (resp.ok) navigate('/welcome')
        else throw new Error("fail to post Board");
    } catch(error) {
        console.log('Error fetching Board:', error);
    };
  };

  const validateId = (e) => {
    e.preventDefault();
    if (idRef.current.value === '') {
      alert('아이디를 입력하세요')
      setIdFlag(false);
      idRef.current.focus();
      return;
    } else if (idRef.current.value === 'member123') {
      alert('사용불가 중복임')
      setIdFlag(false);
      idRef.current.focus();
      return;
    } else {
      alert('사용가능한 아이디')
      console.log(pass2Ref.current)
      setIdFlag(true);
      return;
    }
  };

  const validatePassword = (e) => {
    e.preventDefault();
    if (passRef.current.value === pass2Ref.current.value) {
      setPassCheck(true);
    } else {
      setPassCheck(false);
    }
  };

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <form className='nav w-1/4 flex flex-col justify-center items-center' onSubmit={postMember}>
        <label htmlFor='name' className='w-full pl-2 text-xl text-left opacity-50'>이름</label>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='text'
          id='name'
          ref={nameRef}
        />
        <div className='w-full flex justify-start items-center mt-2'>
          <label htmlFor='id' className='w-fit pl-2 text-xl opacity-50'>아이디&nbsp;&nbsp;</label>
          <p>{idFlag ? <FcCheckmark /> : ''}</p>
        </div>
        <div className='w-full flex flex-row justify-between items-center'>
          <input
            className='w-3/4 h-12 rounded-lg indent-5 text-lg'
            type='text'
            id='id'
            ref={idRef}
          />
          <button className='w-1/5 h-12 pt-1
                          bg-blue-400 opacity-80
                          text-white
                          text-lg rounded-lg
                          hover:shadow-xl
                          hover:bg-blue-500'
                  onClick={validateId}>확인</button>
        </div>


        <label htmlFor='password' className='w-full pl-2 mt-2 text-xl text-left opacity-50'>비밀번호</label>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='password'
          id='password'
          ref={passRef}
        />
        <div className='w-full mt-2 flex flex-row justify-start items-center'>
          <label htmlFor='password2' className='w-full mr-5 pl-2 text-xl text-left opacity-50'>비밀번호 확인</label>
          {!pass2Ref.current || pass2Ref.current.value === '' ? '' : !passCheck ? 
                                      <p className='text-red-600 text-base w-full text-right'>비밀번호가 일치하지 않습니다.</p> :
                                      <p className='text-blue-600 text-base w-full text-right'>비밀번호가 일치합니다.</p> }
        </div>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='password'
          id='password2'
          ref={pass2Ref}
          onChange={validatePassword}
        />
        <button className='w-full h-14 mt-5 pt-1
                          text-xl rounded-lg
                          text-white
                          bg-blue-400 opacity-80
                          hover:shadow-xl
                          hover:bg-blue-500' 
                onClick={() => console.log(nameRef.current.value, idRef.current.value, passRef.current.value)}>가입하기</button>

      </form>
    </div>
  )
}
