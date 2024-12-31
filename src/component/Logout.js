import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Logout({handleClick}) {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem('JWT');
    console.log('로그아웃');
    alert('로그아웃 되었습니다.')
    navigate('/');
  }
  return (
    <button name='로그아웃' 
                        className='nav w-24 px-2 pt-1.5 
                                  rounded-xl text-base 
                                  hover:text-blue-500 text-gray-400'
                        onClick={() => {handleClick(false); logout();}}>
      로그아웃
    </button>
  )
}
