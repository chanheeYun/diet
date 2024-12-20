import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className='home w-full h-full flex flex-col items-center justify-start pt-28'>
      <h1 className='content1 text-5xl my-3'>Muscle MEMOry</h1>
      <h1 className='content1 text-5xl my-3'>건강을 기록하다</h1>
      <button className='p-3 pt-4 btn rounded-xl mt-6 text-lg hover:bg-blue-900 hover:opacity-70 hover:bg hover:font-bold hover:text-white' onClick={() => navigate('/login')}>지금 시작하기</button>
    </div>
  )
}
