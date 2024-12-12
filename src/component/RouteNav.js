import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function RouteNav() {
  const navigate = useNavigate();

  return (
    <div>
      <button className='bg-lime-500' onClick={() => navigate('/diet')}>식단관리</button>
      <button className='bg-lime-500' onClick={() => navigate('/train')}>운동관리</button>
      <button className='bg-lime-500' onClick={() => navigate('/weight')}>체중관리</button>
    </div>
  )
}
