import React from 'react'

export default function Join() {
  return (
    <div>
      <div>
        <div>이름</div>
        <input className='bg-slate-500' type='text'></input>
      </div>
      <div>
        <div>이메일</div>
        <input className='bg-slate-500' type='email'></input>
      </div>
      <div>
        <div>아이디</div>
        <div>
          <input className='bg-slate-500' type='text'></input>
          <button className='bg-orange-600'>중복 확인</button>
        </div>
      </div>
      <div>
        <div>비밀번호</div>
        <input className='bg-slate-500' type='password'></input>
      </div>
      <div>
        <div>비밀번호 확인</div>
        <input className='bg-slate-500' type='password'></input>
      </div>
      <button className='bg-orange-600'>회원가입</button>
    </div>
  )
}
