import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogined } from '../recoil/Atoms';

export default function Login() {
  const idRef = useRef();
  const passRef = useRef();
  const [loginFlag, setLoginFlag] = useRecoilState(isLogined);
  const [wrongId, setWrongId] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // 로그인 처리 로직을 구현합니다.
    e.preventDefault();
    try {
    
      const response = await fetch(
        'http://10.125.121.219:8080/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userid: idRef.current.value,
            password: passRef.current.value,
          }),
        }
      );
      console.log(response)
      if (response.ok) {
        const token = response.headers.get("Authorization");
        if (token) {
          sessionStorage.setItem('JWT', token);
          setLoginFlag(true);
          console.log(loginFlag)
          navigate('/');
        } else {
          setLoginFlag(false);
        }
      } else {
        console.log('응답O 로그인X')
        setLoginFlag(false);
        setWrongId(true);
      }
    } catch(error) {
      throw new Error("fail to login");
    }

  };

  const handleLogin2 = () => {
    console.log(idRef.current.value, passRef.current.value)
  };

  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <form className='nav w-1/4 flex flex-col justify-center items-center' onSubmit={handleLogin}>
        <label htmlFor='id' className='w-full pl-2 text-xl mt-2 text-left opacity-50'>아이디</label>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='text'
          id='id'
          ref={idRef}
        />

        <label htmlFor='password' className='w-full mt-2 pl-2 text-xl text-left opacity-50'>비밀번호</label>
        <input
          className='w-full h-12 rounded-lg indent-5 text-lg'
          type='password'
          id='password'
          ref={passRef}
        />
        {wrongId &&(
          <label className='text-red-600 mt-2'>아이디 혹은 비밀번호가 틀렸습니다.</label> 
        )}
        <button className='w-full h-14 mt-2 
                          text-xl rounded-lg
                          text-white
                          bg-blue-400 opacity-80
                          hover:shadow-xl
                          hover:bg-blue-500' 
                onClick={handleLogin2}>로그인</button>

        <p className='w-full mt-14 text-center text-zinc-600'>
          아직 회원이 아니신가요? <Link to='/join'> 회원가입</Link>
        </p>
      </form>
    </div>
  )
}
