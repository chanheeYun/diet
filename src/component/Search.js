import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import SearchTag from './SearchTag';
import OButton from '../UI/OButton';
import { IoIosArrowForward } from "react-icons/io";
import noResult from '../img/no-result.png';

export default function Search() {
  const [searchData, setSearchData] = useState();
  const [added, setAdded] = useState();
  const [sel, setSel] = useState(
                              <div className='w-full h-full
                                              flex flex-col justify-center items-center'>
                                <p className='content1 opacity-20 text-xl'>내가 먹은 음식을 추가해 보세요.</p>
                              </div>);
  const [tags, setTags] = useState(
                            <div className='w-full h-full
                                            flex flex-col justify-center items-center'>
                              <img className='w-44 h-44 opacity-20' src={noResult} alt='검색 결과 없음' />
                              <p className='content1 opacity-20 text-xl'>검색 결과가 없습니다.</p>
                            </div>);
  const [searchWord, setSearchWord] = useState();
  const searchRef = useRef();
  const first = useParams().item;

  const add = (item) => {
    console.log(item)
    let tm = added.map(comp => comp.food);
    if (tm.findIndex(item) === -1) {
      setAdded([...added, {food:item, cnt:1}]);
    } else {
      countUp(item);
    }
  };

  const countUp = (name) => {
    setAdded(added.map(item => item.food === name
                                ? { ...item, cnt: item.cnt + 1 }
                                : item
      )
    );
  };

  
  useEffect(() => {
    if (!added) return;
    const mksSel = () => {
      let tm = added.map(item => item);
      return tm;
    };
    let temp = mksSel();
    setSel(temp);
  }, [added]);

  useEffect(() => {
    setSearchWord(first);
  }, [first])

  useEffect(() => {
    if (!searchWord) return;

    const loadData = async () => {
      await fetch(`http://10.125.121.219:8080/calories/${searchWord}`)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.jsondata)
        setSearchData(data.jsondata)
      })
      .catch(error => {
        console.error('Error fetching Calorie Data:', error);
      });
    };

    loadData();
  }, [searchWord]);
  
  useEffect(() => {
    if (!searchData) return;
    let tm = searchData.map(item => <SearchTag 
                                      key = {item}
                                      food = {item}
                                      handleClick={() => add(item)} />);
    setTags(tm);
  }, [searchData]);
  

  return (
    <div className='w-10/12 h-full mb-2 flex flex-col justify-center items-center'>
      <div className='w-full h-1/5 pr-2 mb-2 flex flex-col justify-center items-center'>
        <form className='w-1/2 
                         flex flex-col justify-start items-center' 
              action={() => setSearchWord(searchRef)}>
          <div className='w-7/12 h-16 
                          px-5 my-6 rounded-3xl 
                          flex flex-row justify-center items-center 
                          drop-shadow-lg bg-slate-50'>
            <input className='search w-full h-14 pl-3 text-xl indent-1 bg-slate-50 tracking-wider' type='text' id='search' ref={searchRef}></input>
            <input className='search text-xl mx-2 text-blue-700' type='submit' value='검색'></input>
          </div>
        </form>
        {!searchData ? 
          <h3 className='content1 text-xl'><span className='text-2xl text-blue-500 font-semibold'>'{searchWord}'</span>에 대한 검색 결과가 없습니다.</h3> :
          <h3 className='content1 text-xl'><span className='text-2xl text-blue-500 font-semibold'>'{searchWord}'</span>에 대한 검색 결과입니다.</h3>
        }
      </div>
      <div className='w-full h-4/5 flex flex-row justify-center items-center'>
        <div className='w-3/5 h-full p-0.5 flex flex-col justify-center items-center'>
          <div className='w-full h-full 
                          mb-5 p-4
                          flex flex-col justify-start items-center
                          bg-white border-2 rounded-xl border-opacity-50
                          hover:border-blue-500 '>
            {tags}
          </div>
        </div>
        <div className='w-fit h-full flex justify-center items-center'>
          <IoIosArrowForward className='w-24 h-24 opacity-20'/>
        </div>
        <div className='w-2/6 h-full'>
          <div className='h-5/6 border-2 p-4 
                          flex flex-col justify-start items-center
                          hover:border-blue-500 rounded-xl drop-shadow-lg bg-white'>
            {sel}
          </div>
          <div className='h-1/6'>
            <OButton name='내 식단에 추가하기' width='full' height='14' handleClick=''/>
          </div>
        </div>
      </div>
    </div>
  )
}
