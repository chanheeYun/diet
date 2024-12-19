import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function RouteNav() {
  const navigate = useNavigate();

  return (
    <div className='w-6/12 flex flex-row justify-around items-center'>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/diet')}>음식</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/train')}>운동</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/weight')}>체중</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/info')}>통합 정보</button>
    </div>
  )
}
