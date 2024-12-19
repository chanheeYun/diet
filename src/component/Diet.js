import React, { useState } from 'react'
import searchImg from '../img/search.png'
import { ImSearch } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

export default function Diet() {
  const [sel, setSel] = useState();
  const [data, setData] = useState();
  const navigate = useNavigate();

  const loadData = async() => {
    await fetch('http://10.125.121.219:8080/member')
    .then(resp => resp.json())
    .then(data => {
        // console.log(data);
        setData(data);
    })
    .catch(error => console.error('Error fetching data1:', error));
    
  };
  
  return (
    <div className='w-full pl-40 h-11/12 flex flex-row justify-center items-center'>
      <div className='w-1/4 h-7/12'><img className='opacity-85' src={searchImg} alt='search'></img></div>
      <form className='w-1/2 flex flex-col justify-start items-center' action={() => navigate('/search')}>
        <div className='search text-center text-4xl'>How many calories is it?</div>
        <div className='w-7/12 h-16 px-5 my-6 rounded-3xl drop-shadow-lg flex flex-row justify-center items-center bg-slate-50'>
          <ImSearch className='w-7 h-7 mr-2'/>
          <input className='search w-full h-14 pl-3 text-xl border-spacing-0 indent-1 bg-slate-50' type='text' id='search'></input>
          <input className='search text-xl mx-2 text-blue-700' type='submit' value='검색'></input>
        </div>
      </form>
    </div>
    
  )
}
