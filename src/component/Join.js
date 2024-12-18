import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Join() {
  const navigate = useNavigate();
  const idRef = useRef();
  const nameRef = useRef();
  const mailRef = useRef();
  const passRef = useRef();
  let flag = false;

  const postMember = async () => {
    if (nameRef.current.value === '') {
      alert('이름을 입력하세요.')
      nameRef.current.focus();
      return;
    }
    if (mailRef.current.value === '') {
      alert('이메일을 입력하세요.')
      mailRef.current.focus();
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
    if (flag === false) {
      alert('아이디 중복검사 하세요')
      return;
    }

    try {
        const resp = await fetch('http://localhost:8080/board', {
            method:'POST', 
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Bearer abcd'
            },
            body:JSON.stringify({
                'name' : nameRef.current.value,
                'email' : mailRef.current.value,
                'id' : idRef.current.value,
                'password' : passRef.current.value
            })
        });
        if (resp.ok) navigate('/welcome')
        else throw new Error("fail to post Board");
    } catch(error) {
        console.log('Error fetching Board:', error);
    };
  };

  const validateId = () => {
    if (idRef.current.value === 'member123') {
      alert('사용불가 중복임')
      idRef.current.focus();
      return;
    } else {
      alert('사용가능한 아이디')
      flag = true;
    }
  };

  return (
    <div>
      <div>
        <div>이름</div>
        <input ref={nameRef} className='bg-slate-500' type='text'></input>
      </div>
      <div>
        <div>이메일</div>
        <input ref={mailRef} className='bg-slate-500' type='email'></input>
      </div>
      <div>
        <div>아이디</div>
        <div>
          <input ref={idRef} className='bg-slate-500' type='text'></input>
          <button className='bg-orange-600' onClick={validateId}>중복 확인</button>
        </div>
      </div>
      <div>
        <div>비밀번호</div>
        <input ref={passRef} className='bg-slate-500' type='password'></input>
      </div>
      <div>
        <div>비밀번호 확인</div>
        <input className='bg-slate-500' type='password'></input>
      </div>
      <button className='bg-orange-600' onClick={() => postMember()}>회원가입</button>
    </div>
  )
}
