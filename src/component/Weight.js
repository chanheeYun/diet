import React, { useRef, useState } from 'react'
import OButton from '../UI/OButton';

export default function Weight({weight, setWeight}) {
  const [modalOpen, setModalOpen] = useState(false);
  const weightRef = useRef();

  return (
    <div className='h-full w-full'>
      <div className='w-full flex justify-center items-center'>
        <button className='h-16 w-2/4 text-2xl bg-blue-200 nav' onClick={() => setModalOpen(true)}>
          체중 {weight ? ` : ${weight}kg` : '입력하기'}
        </button>
      </div>
      {
        modalOpen &&
        <div className='absolute w-1/3 h-1/2 ml-20 mt-10 bg-white flex flex-col justify-center items-center rounded-2xl shadow-2xl'>
          <p className='insert h-fit w-5/6 px-5 text-4xl mt-10'>What is your weight today?</p>
          <input className='h-1/5 w-1/2 border-2 text-4xl my-10 indent-4 text-center' type='text' placeholder='몸무게(kg)' ref={weightRef}></input>
          <div className='w-full h-1/4 px-28 flex flex-row justify-around'>
            <OButton name='저장' width='2/5' height='1/2' handleClick={() => {setModalOpen(false); setWeight(weightRef.current.value);}} />
            <OButton name='닫기' width='2/5' height='1/2' handleClick={() => setModalOpen(false)} />
          </div>
        </div>
      }
    </div>
  )
}
