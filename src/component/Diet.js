import React, { useRef } from 'react'
import searchImg from '../img/search.png'
import { ImSearch } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

export default function Diet() {
  const navigate = useNavigate();
  const searchRef = useRef();

  const activeEnter = (e) => {
    if(e.key === "Enter") {
      validInput();
    }
  }

  const validInput = () => {
    if (searchRef.current.value === '') {
      alert('검색어를 입력하세요.')
      searchRef.current.focus();
      return;
    }
    navigate(`/search/${searchRef.current.value}`);
  };
  
  return (
    <div className='w-full pl-40 h-11/12 flex flex-row justify-center items-center'>
      <div className='w-1/4 h-7/12'><img className='opacity-85' src={searchImg} alt='search'></img></div>
      <form className='w-1/2 flex flex-col justify-start items-center'>
        <div className='search text-center text-4xl'>How many calories is it?</div>
        <div className='w-7/12 h-16 px-5 my-6 rounded-3xl drop-shadow-lg flex flex-row justify-center items-center bg-slate-50'>
          <ImSearch className='w-7 h-7 mr-2'/>
          <input className='search w-full h-14 pl-3 text-xl border-spacing-0 indent-1 bg-slate-50' 
                  type='text' id='search' ref={searchRef}
                  onKeyDown={(e) => activeEnter(e)}></input>
          <input className='search text-xl mx-2 text-blue-700' type='button' value='검색' onClick={validInput}></input>
        </div>
      </form>
    </div>
    
  )
}
