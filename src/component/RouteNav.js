import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function RouteNav() {
  const navigate = useNavigate();

  return (
    <div className='w-7/12 pl-28 flex flex-row justify-between items-center'>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/diet')}>식단 관리</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/train')}>운동 일지</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/weight')}>체중 관리</button>
      <button className='nav p-3 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/info')}>통합 정보</button>
    </div>
  )
}
