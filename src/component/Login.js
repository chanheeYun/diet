import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
      <div>
        <div>아이디</div>
        <input className='bg-slate-500' type='text'></input>
      </div>
      <div>
        <div>비밀번호</div>
        <input className='bg-slate-500' type='password'></input>
      </div>
      <button className='bg-orange-600'>로그인</button>
      <Link to='/join'><button className='bg-orange-600'>회원가입</button></Link>
    </div>
  )
}
