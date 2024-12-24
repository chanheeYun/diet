import React, { useState, useRef } from 'react'
import OButton from '../UI/OButton';

export default function Weight() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  return (
    <div className='h-full w-full bg-red-200'>
      <div className='w-full flex justify-center items-center'>
        <button className='h-11 w-2/3 text-2xl bg-blue-400' onClick={() => setModalOpen(true)}>
          오늘의 체중 입력하기
        </button>
      </div>
      {
        modalOpen &&
        <div className='w-full h-full bg-green-300'>
          <div className='absolute w-1/3 h-1/2 ml-20 mt-10 bg-white flex flex-col justify-center items-center backdrop-blur-sm'>
            <p className='h-1/4'>What is your weight today?</p>
            <input className='h-1/2' type='text'></input>
            <div className='w-full h-1/4 px-10 flex flex-row justify-around'>
              <OButton name='저장' width='1/4' height='1/2' handleClick={() => setModalOpen(false)} />
              <OButton name='닫기' width='1/4' height='1/2' handleClick={() => setModalOpen(false)} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}
