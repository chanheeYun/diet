import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const navigate = useNavigate();
  
  return (
    <div>
      회원가입 성공
      <button className='bg-lime-500' onClick={() => navigate('/login')}>로그인하러 가기</button>
    </div>
  )
}
