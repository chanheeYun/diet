import React, { useRef, useState } from 'react'
import OButton from '../UI/OButton';

export default function Weight({weight, setWeight, date}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [placeholder1, setPlaceholder1] = useState('체중(kg)')
  const [placeholder2, setPlaceholder2] = useState('체지방(kg)')
  const [placeholder3, setPlaceholder3] = useState('단백질(kg)')
  const [placeholder4, setPlaceholder4] = useState('골격근량(kg)')
  const [placeholder5, setPlaceholder5] = useState('체수분(ℓ)')
  const [placeholder6, setPlaceholder6] = useState('무기질(kg)')
  const weightRef = useRef();
  const fatRef = useRef();
  const muscleRef = useRef();
  const waterRef = useRef();
  const mineralRef = useRef();
  const proteinRef = useRef();
  
  const sendWeight = async () => {
    const token = sessionStorage.getItem('JWT');
    const weight2 = weightRef.current.value;
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
            'weight': weight2,
            'muscle': muscleRef.current.value,
            'fat': fatRef.current.value,
            'water': waterRef.current.value,
            'mineralRef': mineralRef.current.value,
            'proteinRef': proteinRef.current.value,
            'date': date
          })
      });
      if (resp.ok) {
        console.log(resp)
        setWeight(weight2)
      }
      else throw new Error("fail to post Weight");
    } catch(error) {
        console.log('Error fetching Weight:', error);
    };
  };

  return (
    <div className='w-full h-full'>
      <div className='w-full flex justify-center items-center'>
        <button className='h-20 w-80 text-3xl bg-blue-200 nav rounded-b-2xl' onClick={() => setModalOpen(true)}>
          {weight ? `체중 : ${weight}kg` : '체성분 정보 입력'}
        </button>
      </div>
      {
        modalOpen &&
        <div className='w-full h-full'>
          <div className='absolute w-1/3 h-1/2 ml-32 mt-8 
                        bg-gray-100 border-2 flex flex-col justify-between pb-3 items-center 
                        rounded-2xl shadow-2xl' >
            <div className='h-1/6 w-full flex flex-row justify-end items-start'>
              <p className='insert w-5/6 text-4xl mt-3 pl-28'>How much do you weight today?</p>
              <button className='h-fit w-1/6 mt-1 pr-3 text-2xl text-right' onClick={() => {setModalOpen(false);}}>×</button>
            </div>
            <div className='w-full h-1/2 flex flex-row'>
              <div className='w-1/2 h-full flex flex-col justify-center items-end pr-3'>
                <input className='h-1/4 w-4/6 border-2 text-xl indent-3 text-center' 
                        type='number' 
                        ref={weightRef}
                        placeholder={placeholder1} 
                        onFocus={() => setPlaceholder1('')} onBlur={() => setPlaceholder1('체중(kg)')}></input>
                <input className='h-1/4 w-4/6 my-3 border-2 text-xl indent-3 text-center' 
                        type='number' 
                        ref={fatRef}
                        placeholder={placeholder2} 
                        onFocus={() => setPlaceholder2('')} onBlur={() => setPlaceholder2('체지방(kg)')}></input>
                <input className='h-1/4 w-4/6 border-2 text-xl indent-3 text-center' 
                        type='number' 
                        ref={proteinRef}
                        placeholder={placeholder3} 
                        onFocus={() => setPlaceholder3('')} onBlur={() => setPlaceholder3('단백질(kg)')}></input>
              </div>
              <div className='w-1/2 h-full flex flex-col justify-center items-start pl-3'>
                <input className='h-1/4 w-4/6 border-2 text-xl indent-3 text-center' 
                        type='number' 
                        ref={muscleRef}
                        placeholder={placeholder4} 
                        onFocus={() => setPlaceholder4('')} onBlur={() => setPlaceholder4('골격근량(kg)')}></input>
                <input className='h-1/4 w-4/6 border-2 my-3 text-xl indent-3 text-center' 
                        type='number' 
                        ref={waterRef}
                        placeholder={placeholder5} 
                        onFocus={() => setPlaceholder5('')} onBlur={() => setPlaceholder5('체수분ℓ)')}></input>
                <input className='h-1/4 w-4/6 border-2 text-xl indent-3 text-center' 
                        type='number' 
                        ref={mineralRef}
                        placeholder={placeholder6} 
                        onFocus={() => setPlaceholder6('')} onBlur={() => setPlaceholder6('무기질(kg)')}></input>
              </div>
            </div>
            <div className='w-full h-1/6 flex flex-row justify-center pb-4'>
              <OButton name='저장' width='4/6' height='3/6' handleClick={() => {sendWeight(); setModalOpen(false);}} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}
