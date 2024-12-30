import React, { useState } from 'react'
import Calendar from './Calendar'
import Chart from './chart/Chart'

export default function Info() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className='w-10/12 h-full flex flex-row justify-between items-center'>
      <div className='w-5/12 h-4/5'>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>
      <div className='w-7/12 h-full py-10 px-20 chart'>
        <div className='scroll-container w-full h-full py-5 
                        border-2 border-blue-300 bg-white bg-opacity-50
                        rounded-xl'>
          <div className='w-full h-fit text-center chart text-2xl pl-5'>체성분 분석</div>
          <Chart i='0' />
          <div className='w-full h-fit mt-7 mb-2 text-center chart text-2xl pl-5'>지방·골격근 분석</div>
          <div className='w-full h-full flex flex-col justify-center items-start'>
            <Chart i='1' />
            <Chart i='2' />
          </div>
          <div className='w-full h-fit mt-7 text-center chart text-2xl pl-5'>주간 영양 섭취 현황</div>
          <Chart i='3' />
          <div className='w-full h-fit mt-10 text-center chart text-2xl pl-5'>최근 10일 체중(kg)</div>
          <Chart i='4' />
        </div>
      </div>
    </div>
  )
}
