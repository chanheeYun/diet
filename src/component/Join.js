import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FcCheckmark } from "react-icons/fc";

export default function Join() {
  const [passCheck, setPassCheck] = useState();
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const heightRef = useRef();
  const passRef = useRef();
  const pass2Ref = useRef();
  const [idFlag, setIdFlag] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState('');

  const postMember = async (e) => {
    e.preventDefault();
    if (nameRef.current.value === '') {
      alert('이름을 입력하세요.')
      nameRef.current.focus();
      return;
    }
    if (heightRef.current.value === '') {
      alert('신장(키)을 입력하세요.')
      heightRef.current.focus();
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
        const resp = await fetch('http://10.125.121.219:8080/signup', {
            method:'POST', 
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                'name' : nameRef.current.value,
                'userid' : idRef.current.value,
                'password' : passRef.current.value,
                'height': heightRef.current.value
            })
        });
        if (resp.ok) {
          alert('회원가입이 완료 되었습니다. 로그인 페이지로 이동합니다.')
          navigate('/login')
        } else throw new Error("fail to post Member");
    } catch(error) {
        console.log('Error fetching Member:', error);
    };
  };

  const validateId = async (e) => {
    e.preventDefault();
    if (idRef.current.value === '') {
      alert('아이디를 입력하세요')
      setIdFlag(false);
      idRef.current.focus();
      return;
    } 

    const idRegex = /^[a-zA-Z0-9_-]+$/;
    if (!idRegex.test(idRef.current.value)) {
      alert('아이디는 특수문자나 공백을 포함할 수 없습니다.')
      setIdFlag(false);
      idRef.current.focus();
      return;
    }

    try {
      const resp = await fetch(`http://10.125.121.219:8080/idcheck?userid=${idRef.current.value}`);
      if (resp.ok) {
        const data = await resp.json();
        console.log(data.isDuplicate)
        setIsDuplicate(data.isDuplicate ? '중복' : '통과');
      } else {
        setIsDuplicate('')
        throw new Error("fail to join");
      }
    } catch(error) {
      setIsDuplicate('')
      console.log('Error fetching ID Check:', error);
    };
  };

  useEffect(() => {
    if (isDuplicate === '') {
      setIdFlag(false);  
      return;
    }
    console.log(isDuplicate)
    if (isDuplicate === '중복') {
      alert('이미 사용 중인 아이디입니다.')
      setIdFlag(false);
      idRef.current.focus();
      return;
    } else {
      alert('사용 가능한 아이디 입니다.')
      setIdFlag(true);
      return;
    }
  },[isDuplicate]);

  const validatePassword = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(passRef.current.value)) {
      alert('비밀번호는 숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.')
      passRef.current.focus();
      return;
    }

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
        <label htmlFor='height' className='w-full pl-2 text-xl text-left opacity-50 mt-2'>신장(키)</label>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='number'
          id='height'
          ref={heightRef}
        />
        <div className='w-full flex justify-start items-center mt-2'>
          <label htmlFor='id' className='w-fit pl-2 text-xl opacity-50'>아이디&nbsp;</label>
          <p className='pb-1'>{idFlag ? <FcCheckmark /> : ''}</p>
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
