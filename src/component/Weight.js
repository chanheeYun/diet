import React, { useRef, useState } from 'react'
import OButton from '../UI/OButton';

export default function Weight({weight, setWeight, date}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('몸무게(kg)')
  const weightRef = useRef();
  
  const sendWeight = async () => {
    const token = sessionStorage.getItem('JWT');
    const weight = weightRef.current.value;
    console.log('date:', date)
    console.log('weight:', weight)
    try {
      const resp = await fetch('http://10.125.121.219:8080/member/weight', {
          method:'POST', 
          headers: {
              'Content-Type':'application/json',
              'Authorization': token,
          },
          body:JSON.stringify({
            'kg': weight,
            'date': date
          })
      });
      if (resp.ok) {
        setWeight(weight)
        console.log(resp)
      }
      else throw new Error("fail to post Diet");
    } catch(error) {
        console.log('Error fetching Diet:', error);
    };
  };

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-center items-center'>
        <button className='h-20 w-80 text-3xl bg-blue-200 nav rounded-b-2xl' onClick={() => setModalOpen(true)}>
          체중 {weight ? ` : ${weight}kg` : '입력하기'}
        </button>
      </div>
      {
        modalOpen &&
        <div className='w-full h-full'>
          <div className='absolute w-1/3 h-1/2 ml-36 mt-10 
                        bg-gray-100 border-2 flex flex-col justify-center items-center 
                        rounded-2xl shadow-2xl' >
            <p className='insert h-fit w-5/6 px-5 text-4xl mt-10'>How much do you weight today?</p>
            <input className='h-1/5 w-1/2 border-2 text-4xl my-10 indent-3 text-center' 
                    type='number' 
                    ref={weightRef}
                    placeholder={placeholder} 
                    onFocus={() => setPlaceholder('')} onBlur={() => setPlaceholder('몸무게(kg)')}></input>
            <div className='w-full h-1/4 px-28 flex flex-row justify-around'>
              <OButton name='저장' width='2/5' height='1/2' handleClick={() => {sendWeight(); setModalOpen(false);}} />
              <OButton name='닫기' width='2/5' height='1/2' handleClick={() => setModalOpen(false)} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}
