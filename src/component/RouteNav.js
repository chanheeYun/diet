import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function RouteNav() {
  const navigate = useNavigate();

  return (
    <div className='w-7/12 flex flex-row justify-around items-center'>
      <button className='nav px-3 pt-1.5 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/diet')}>음식</button>
      <button className='nav px-3 pt-1.5 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/train')}>운동</button>
      <button className='nav px-3 pt-1.5 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/manage')}>식단 관리</button>
      <button className='nav px-3 pt-1.5 rounded-xl text-lg hover:bg-slate-100 text-gray-600' onClick={() => navigate('/info')}>통합 정보</button>
    </div>
  )
}
